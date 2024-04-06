import React, { useEffect, useState } from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import { useUser } from "@/context/LoginRequired";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileUserAvatar from "./ProfileUserAvatar";
const isFormValid = (editedUserData) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
  if (
    !editedUserData.name ||
    editedUserData.name.replaceAll(" ", "").length === 0
  ) {
    toast.error("Name is required");
    return false;
  }
  if (!editedUserData.email || !emailRegex.test(editedUserData.email)) {
    toast.error("Invalid email");
    return false;
  }
  return true;
};

const ProfileCard = ({ userData, setUserData, isEditable = false }) => {
  const currentUser = useUser();
  const { userId } = useParams();
  const isOwnProfile = userId === currentUser.userId || !userId;
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);
  const [editedUserPhoto, setEditedUserPhoto] = useState(null);

  useEffect(() => {
    setEditedUserData(userData);
  }, [userData]);

  const onSaveEdit = async () => {
    if (!isFormValid(editedUserData)) return;
    setIsInEditMode(false);
    if (editedUserPhoto) {
      const formData = new FormData();
      formData.append("file", editedUserPhoto);

      try {
        let response;
        console.log("Uploading user photo", userData?.photoUrl);

        response = await api.post(
          `api/Cloud/profile-photo?UserId=${currentUser.userId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
              "Content-Type": undefined,
            },
          },
        );
        if (response.status === 200) {
          console.log(response.data);
          setUserData({
            ...userData,
            photoUrl: response.data.user.profilePictureUrl,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to upload user photo");
      }
      setEditedUserPhoto(null);
    }
    try {
      const response = await api.put(
        `/api/v1/Users/${currentUser.userId}`,
        {
          id: currentUser.userId,
          name: editedUserData.name,
          email: editedUserData.email,
          bio: editedUserData.bio,
          mobile: editedUserData.mobile,
          location: editedUserData.location,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setUserData({
          name: response.data.user?.name || "John Doe",
          username: response.data.user?.username || "Unknown username",
          email: response.data.user?.email,
          bio: response.data.user?.bio,
          mobile: response.data.user?.mobile,
          location: response.data.user?.location,
        });
        toast.success("User data updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user data");
    }
  };
  const onCancelEdit = () => {
    setIsInEditMode(false);
    setEditedUserData(userData);
    setEditedUserPhoto(null);
  };
  return (
    <>
      <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
        <div className="flex items-center gap-6">
          {/* <Avatar
            src="/img/bruce-mars.jpeg"
            alt="bruce-mars"
            size="xl"
            variant="rounded"
            className="rounded-lg shadow-lg shadow-blue-gray-500/40"
          /> */}
          <ProfileUserAvatar
            photoUrl={userData.photoUrl}
            editedUserPhoto={editedUserPhoto}
            setEditedUserPhoto={setEditedUserPhoto}
            isInEditMode={isInEditMode}
          />
          <div>
            {!isInEditMode ? (
              <Typography variant="h5" className="mb-1 text-surface-light">
                {userData.name}
              </Typography>
            ) : (
              <Input
                value={editedUserData.name}
                onChange={(e) =>
                  setEditedUserData({ ...editedUserData, name: e.target.value })
                }
                variant={"outlined"}
                label={"Name"}
                size={"md"}
                color={"green"}
                className={"text-white"}
                crossOrigin={undefined}
              />
            )}
            <Typography
              variant="small"
              className="font-normal text-surface-mid-light"
            >
              {"@" + userData?.username || "Unknown username"}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3 text-surface-darkest">
          <ProfileInfoCard
            bio={userData?.bio}
            details={{
              mobile: userData?.mobile,
              email: userData?.email,
              location: userData?.location,
            }}
            isEditable={isEditable}
            isInEditMode={isInEditMode}
            onEnterEditMode={() => setIsInEditMode(true)}
            editedUserData={editedUserData}
            setEditedUserData={setEditedUserData}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

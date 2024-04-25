import React, { useEffect, useState } from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import { useUser } from "@/context/LoginRequired";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileUserAvatar from "./ProfileUserAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "@material-tailwind/react";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import Badges from "./Badges";
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
const activeMenuStyles = "bg-gray-100 text-gray-900";
const inactiveMenuStyles = "text-gray-700";
const menuStyles =
  "group flex rounded-md items-center w-full px-2 py-2 text-sm";
const ProfileCard = ({ userData, setUserData, isEditable = false }) => {
  const currentUser = useUser();
  const { userId } = useParams();
  const isOwnProfile = userId === currentUser.userId || !userId;
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState(userData);
  const [editedUserPhoto, setEditedUserPhoto] = useState(null);
  const [exportType, setExportType] = useState(1);

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

  const handleSelectExportType = (value) => {
    setExportType(value);
    console.log("Export type selected", value);
  };
  const handleExportData = async () => {
    if (!exportType) {
      toast.error("Please select an export type");
    }
    try {
      const response = await api.get(
        `/api/v1/Email/${currentUser.userId}?dateRange=${exportType}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Data exported successfully. Please check your email");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to export data");
    }
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
          <div className="flex items-center">
            <div>
              {!isInEditMode ? (
                <Typography variant="h5" className="mb-1 text-surface-light">
                  {userData.name}
                </Typography>
              ) : (
                <Input
                  value={editedUserData.name}
                  onChange={(e) =>
                    setEditedUserData({
                      ...editedUserData,
                      name: e.target.value,
                    })
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

            {isOwnProfile && !isInEditMode && (
              <div className="flex items-center ml-20">
                <Tooltip
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  content={
                    <div className="w-44">
                      Export your data to email by selecting the date range!
                    </div>
                  }
                >
                  <FontAwesomeIcon
                    icon={faFileExport}
                    size="lg"
                    // beatFade
                    className="text-white  cursor-pointer"
                    onClick={handleExportData}
                  />
                </Tooltip>
                <Menu as="div" className="relative inline-block text-left">
                  <Menu.Button>
                    <EllipsisVerticalIcon className="h-7 w-7 text-gray-900 cursor-pointer mt-1" />
                  </Menu.Button>
                  <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {[
                        { type: "Last 7 days", value: 1 },
                        { type: "Last 90 days", value: 2 },
                        { type: "Last 180 days", value: 3 },
                        { type: "Last year", value: 4 },
                      ].map((exportData, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? activeMenuStyles : inactiveMenuStyles
                              } ${menuStyles}`}
                              onClick={() =>
                                handleSelectExportType(exportData.value)
                              }
                            >
                              {exportData.type}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Menu>
              </div>
            )}
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
          {
            <div className="col-span-1 xl:col-span-2 lg:border-l border-surface-mid">
              <Typography variant="h5" className="mb-4 text-surface-light ml-6">
                Badges
              </Typography>
              <Badges
                currentViewedId={isOwnProfile ? currentUser.userId : userId}
                isOwnProfile={isOwnProfile}
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default ProfileCard;

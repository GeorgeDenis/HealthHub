import {
  Card,
  CardBody,
  Button,
  Dialog,
  Spinner,
} from "@material-tailwind/react";
import ProfileCard from "./ProfileCard";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUser } from "@/context/LoginRequired";
import axios from "axios";
import { toast } from "react-toastify";
import { DialogActions, DialogTitle } from "@mui/material";

import api from "../../../services/api";

export function Profile() {
  const currentUser = useUser();
  const navigate = useNavigate();
  const { userId } = useParams();
  const isOwnProfile = userId === currentUser.userId || !userId;
  const [userData, setUserData] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(
          `/api/v1/Users/${userId || currentUser.userId}`,
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
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 404 || error.response.status === 500) {
            navigate("/404");
          } else {
            toast.error("Failed to fetch user data");
          }
        } else {
          console.log(error);
          toast.error("An unexpected error occurred");
        }
      }
    };

    getUserData();
  }, [userId]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-surface-dark">
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-48 mb-6 lg:mx-4 bg-surface-darkest">
        <CardBody className="p-4">
          {userData ? (
            <ProfileCard
              userData={userData}
              setUserData={setUserData}
              isEditable={isOwnProfile}
            />
          ) : (
            <div className={"flex justify-center my-48"}>
              <Spinner className={"h-8 w-8"} />
            </div>
          )}
          {isOwnProfile && (
            <div className="flex items-center justify-between flex-wrap gap-6">
              <Button
                className="shadow-md bg-secondary hover:bg-primary ml-auto"
                ripple
                onClick={() => setShowLogoutDialog(true)}
              >
                Log out
              </Button>
              <Dialog
                open={showLogoutDialog}
                handler={() => setShowLogoutDialog(false)}
                className="bg-surface-dark p-5"
                size={"sm"}
              >
                <DialogTitle className={"text-surface-light"}>
                  Are you sure you want to log out?
                </DialogTitle>
                <DialogActions className={"mt-5"}>
                  <Link to="/auth/sign-in">
                    <Button
                      className="shadow-md bg-secondary hover:bg-primary"
                      ripple
                    >
                      Log out
                    </Button>
                  </Link>
                  <Button onClick={() => setShowLogoutDialog(false)}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;

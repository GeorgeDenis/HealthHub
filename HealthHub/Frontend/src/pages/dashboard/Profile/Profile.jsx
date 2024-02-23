import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
  Button,
  Dialog,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link,useNavigate,useParams } from "react-router-dom";
import { ProfileInfoCard } from "@/widgets/cards";
import { useUser } from "@/context/LoginRequired";
import axios from "axios";
import {toast} from "react-toastify";
import {DialogActions, DialogTitle} from "@mui/material";


import api from "../../../services/api";

export function Profile() {
  const currentUser = useUser();
  const navigate = useNavigate();
  const {userId} = useParams();
  const isOwnProfile = userId === currentUser.userId || !userId;
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [userData, setUserData] = useState({
    name: null,
    username: null,
    bio: null,
    email: null,
    mobile: null,
    location: null,
  });
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/api/v1/Users/${userId || currentUser.userId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
        if (response.status === 200) {
          console.log(response.data);
          setUserData({
            name: response.data?.name,
            username: response.data?.username,
            bio: response.data?.bio,
            email: response.data?.email,
            mobile: response.data?.mobile,
            location: response.data?.location,          
          });
        }
      }catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 404 || error.response.status === 500) {
            navigate('/404');
          } else {
            toast.error("Failed to fetch user data");
          }
        } else {
          console.log(error);
          toast.error("An unexpected error occurred");
        }
      }
    }
    getUserData();
  }, [userId]);

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src="/img/bruce-mars.jpeg"
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1">
                  Richard Davis
                </Typography>
              </div>
            </div>
            <div className="w-96">
              <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs>
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            
            <ProfileInfoCard
              title="Profile Information"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              details={{
                "first name": "George Denis",
                mobile: "(44) 123 1234 123",
                email: "georgedenis@mail.com",
                location: "Romania",
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
          </div>
          {isOwnProfile && <div className="flex items-center justify-between flex-wrap gap-6">
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
                <DialogTitle className={"text-surface-light"}>Are you sure you want to log out?</DialogTitle>
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
            </div>}
        </CardBody>
      </Card>
    </>
  );
}

export default Profile;

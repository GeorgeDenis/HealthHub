import React from "react";
import { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";
import { userBadgesData } from "./user-badges";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";

import { Tooltip } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const Badges = ({ currentViewedId, isOwnProfile }) => {
  const navigate = useNavigate();
  const user = useUser();
  const [userBadges, setUserBadges] = useState([]);
  const [userStats, setUserStats] = useState([]);

  const getUserBadges = async () => {
    try {
      const response = await api.get(`/api/v1/Badges/${currentViewedId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data.badges);
        setUserBadges(
          response.data.badges.sort((a, b) => a.type.localeCompare(b.type)),
        );
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
  const getUserStats = async () => {
    try {
      const response = await api.get(`api/v1/Users/stats/${currentViewedId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 200) {
        setUserStats(response.data.userStats);
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
  const updateBadgeRequest = async (badge) => {
    try {
      const response = await api.post(`/api/v1/Badges`, badge, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.status === 201) {
        console.log(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 404 || error.response.status === 500) {
          navigate("/404");
        } else {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    }
  };
  const updateBadges = async () => {
    let requestBadgeData = {};
    for (let i = 0; i < userBadgesData.length; i++) {
      requestBadgeData.name = userBadgesData[i].src;
      requestBadgeData.description = userBadgesData[i].description;
      requestBadgeData.count = userStats[userBadgesData[i].countName];
      requestBadgeData.userId = currentViewedId;
      requestBadgeData.type = userBadgesData[i].type;
      await updateBadgeRequest(requestBadgeData);
    }
  };
  const handleVote = async (badgeType) => {
    try {
      const response = await api.put(
        `/api/v1/Badges`,
        { voterId: user.userId, votedId: currentViewedId, type: badgeType },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      if (response.status === 200) {
        getUserBadges();
        toast.success("Endorsment sent successfully!");
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.7 },
        });
        //send notification
      }
    } catch (error) {
      let errorMessage = "";
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data) {
          errorMessage += error.response.data.validationsErrors[0];
        }
      } else if (error instanceof Error) {
        errorMessage += error.message;
      }
      toast.error(errorMessage);
    }
  };
  useEffect(() => {
    getUserBadges().then(getUserStats().then(updateBadges()));
  }, [currentViewedId]);
  return (
    <div className="w-[20rem] md:w-[30rem] grid grid-rows-5 sm:grid-rows-5 md:grid-rows-4 2xl:grid-rows-3 3xl:grid-rows-2 grid-flow-col p-4 rounded-lg shadow-xs dark:bg-gray-800">
      {userBadges?.map((badge, index) => {
        return (
          badge.active && (
            <div
              key={index}
              className="w-[8rem] h-[8rem] flex flex-col items-center"
            >
              <Tooltip
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
                content={
                  <div className="w-36 text-center">{badge.description}</div>
                }
              >
                <Avatar
                  className="rounded-full select-none object-cover"
                  src={`../../../../../public/${badge.name}`}
                  alt="badge"
                  size="xl"
                />
              </Tooltip>
              <div className="flex flex-col items-center">
                <p className="text-sm font-semibold text-gray-400 dark:text-white text-center">
                  {badge.type}
                </p>
                <div className="flex flex-row items-center gap-1">
                  <p className="text-center text-sm text-surface-light px-2 rounded-sm bg-opacity-20 bg-secondary ">
                    {badge.count}
                  </p>
                  {(badge.type == "Friendly-Spirit" ||
                    badge.type == "Community-Champ" ||
                    badge.type == "Consistency" ||
                    badge.type == "Challenge-Leader") &&
                  !isOwnProfile ? (
                    <PlusIcon
                      title="Endorse Skill"
                      className="text-green-900 bg-gray-200 w-5 h-5 cursor-pointer px-0.5 rounded-full"
                      onClick={() => handleVote(badge.type)}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default Badges;

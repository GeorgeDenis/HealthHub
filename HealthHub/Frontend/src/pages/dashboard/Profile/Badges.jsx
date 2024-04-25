import React from "react";
import { useEffect, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";

import { Tooltip } from "@material-tailwind/react";
const Badges = ({ isOwnProfile }) => {
  const userBadges = [
    {
      src: "../../../../public/img/badges/nutrition_badge.png",
      description: "Awarded for logging meals for 30 consecutive days.",
      vote: false,
      type: "Nutrition Ninja ",
    },
    {
      src: "../../../../../public/img/badges/weight_badge.png",
      description:
        "For those who consistently log their weight each week for six months.",
      vote: false,
      type: "Weight Tracker",
    },
    {
      src: "../../../../../public/img/badges/chats_badge.png",
      description: "For users actively chatting and connecting with others",
      vote: false,
      type: "Community Connector",
    },
    {
      src: "../../../../../public/img/badges/hydratation_badge.png",
      description: "Earned by logging daily water for 30 consecutive days.",
      vote: false,
      type: "Hydration Hero",
    },
    {
      src: "../../../../../public/img/badges/recipe_badge.png",
      description: " Given to users who have commented on over 50 recipes.",
      vote: false,
      type: "Recipe Master",
    },
    {
      src: "../../../../../public/img/badges/workout_badge.png",
      description: "For users who log at least 100 exercise sessions",
      vote: false,
      type: "Workout Warrior",
    },
    {
      src: "../../../../../public/img/badges/challenger_badge.png",
      description:
        "For those who initiate and lead group challenges or activities.",
      vote: true,
      type: "Challenge Leader",
    },
    {
      src: "../../../../../public/img/badges/community_motivator_badge.png",
      description:
        "Awarded to users who are frequently helpful, supportive, or positive in community interactions.",
      vote: true,
      type: "Community Champ",
    },
    {
      src: "../../../../../public/img/badges/friendly_spirit_badge.png",
      description:
        "Given to users known for their friendliness and warmth in interactions. ",
      vote: true,
      type: "Friendly Spirit",
    },
    {
      src: "../../../../../public/img/badges/consistency_badge.png",
      description:
        "Awarded to users who log their food, water, exercises, and weight consistently over an extended period.",
      vote: true,
      type: "Consistency",
    },
  ];
  return (
    <div className="w-[20rem] md:w-[30rem] grid grid-rows-5 sm:grid-rows-4 md:grid-rows-2 grid-flow-col p-4 rounded-lg shadow-xs dark:bg-gray-800">
      {userBadges.map((badge, index) => (
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
              src={badge.src}
              alt="badge"
              size="xl"
            />
          </Tooltip>
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-400 dark:text-white text-center">
              {badge.type}
            </p>
            <div className="flex flex-row items-center gap-1">
              {badge.vote && (
                <p className="text-center text-sm text-surface-light px-2 rounded-sm bg-opacity-20 bg-secondary ">
                  {0}
                </p>
              )}
              {badge.vote && !isOwnProfile ? (
                <PlusIcon
                  title="Endorse Skill"
                  className="text-surface-dark w-5 h-5 cursor-pointer px-0.5 rounded-full bg-secondary"
                  //onClick={() => handleVote(badge.type)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Badges;

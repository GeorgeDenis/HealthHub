import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import TourIcon from "@mui/icons-material/Tour";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

const CaloriesBanner = ({ caloriesNeeded }) => {
  const [progress, setProgress] = useState(0.9);

  useEffect(() => {}, []);

  return (
    <div className="w-[20rem] md:w-[25rem] h-[15rem] bg-green-900 rounded-md p-4 shadow-lg ">
      <div className="flex flex-col items-start gap-2">
        <Typography className="text-md font-semibold" color="white">
          Calories
        </Typography>
        <p className="text-xs mb-2 text-white">
          Remaining = Goal - Food + Exercise
        </p>
        <div className="w-full flex items-center justify-around">
          <div className="flex justify-center items-center">
            <svg
              className="progress-circle"
              width="105"
              height="105"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className="stroke-current text-gray-300"
                strokeWidth="10"
              />
              <text
                x="50"
                y="45" // Adjusted for vertical position
                className="text-lg font-semibold fill-current text-white"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {caloriesNeeded}
              </text>
              <text
                x="50"
                y="65"
                className="text-md font-semibold fill-current text-white text-xs"
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                Remaining
              </text>

              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                className="stroke-current text-green-600"
                strokeWidth="10"
                strokeDasharray={`calc(283 * ${progress}), 283`}
                strokeLinecap="round"
                style={{ transform: "rotate(-90deg) translate(-100%)" }}
              />
            </svg>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <TourIcon className="text-gray-600" />
              <div className="flex flex-col text-xs text-white">
                <p>Base Goal</p>
                <p>2000</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <RestaurantIcon className="text-blue-600" />
              <div className="flex flex-col text-xs text-white">
                <p>Food</p>
                <p>500</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <SportsHandballIcon className="text-orange-600" />
              <div className="flex flex-col text-xs text-white">
                <p>Exercise</p>
                <p>500</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesBanner;

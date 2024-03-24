import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import TourIcon from "@mui/icons-material/Tour";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

const FatIntakeBanner = () => {
  return (
    <div className="w-[20rem] md:w-[26rem] bg-green-900 rounded-md p-6 shadow-lg">
      <div className="flex flex-col items-start gap-2">
        <Typography className="text-md font-semibold" color="white">
          Heart Healty
        </Typography>
        <div className="w-full flex flex-col items-start gap-2">
          {/* <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
            <div className="relative h-6 flex items-center justify-center">
              <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[60%] bg-surface-mid "></div>
              <div className="relative text-black-700 font-medium text-sm">
                60%
              </div>
            </div>
          </div> */}
          <ProgressLevel progress={60} category={"Fat"} />
          <ProgressLevel progress={80} category={"Sodium"} />
          <ProgressLevel progress={90} category={"Cholesterol"} />
        </div>
      </div>
    </div>
  );
};
const ProgressLevel = ({ progress, category }) => {
  return (
    <>
      <div className="w-full flex justify-between  text-sm text-white">
        <div class="mb-1 font-medium text-surface-light dark:text-green-500">
          {category}
        </div>
        <p>9/102g</p>
      </div>

      <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          class="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default FatIntakeBanner;

import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import TourIcon from "@mui/icons-material/Tour";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";

const FatIntakeBanner = ({fatsNeeded,fatsFromFood}) => {
  return (
    <div className="w-[20rem] md:w-[25rem] h-[15rem] bg-green-900 rounded-md p-4 shadow-lg ">
      <div className="flex flex-col items-start gap-2">
        <Typography className="text-md font-semibold" color="white">
          Heart Healty
        </Typography>
        <div className="w-full flex flex-col items-start gap-2">
          <ProgressLevel progress={fatsFromFood * 100 / fatsNeeded} category={"Fat"} total={fatsNeeded} current={fatsFromFood} unit={"g"}/>
          <ProgressLevel progress={200*100/2300} category={"Sodium"} total={2300} current={200} unit={"mg"}/>
          <ProgressLevel progress={9*100/300} category={"Cholesterol"} total={300} current={9} unit={"mg"}/>
        </div>
      </div>
    </div>
  );
};
const ProgressLevel = ({ progress, category,total,unit,current }) => {
  progress = Math.min(progress, 100);
  return (
    <>
      <div className="w-full flex justify-between   text-white text-xs md:text-sm">
        <div className="mb-1 font-medium text-surface-light dark:text-green-500">
          {category}
        </div>
        <p>{current}/{total}{unit}</p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full dark:bg-green-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </>
  );
};

export default FatIntakeBanner;

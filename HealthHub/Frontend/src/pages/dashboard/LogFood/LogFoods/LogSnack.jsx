import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import IcecreamIcon from '@mui/icons-material/Icecream';

const LogSnack = ({ foodsItems }) => {
  return (
    <div className="flex flex-col mt-4 px-1 mb-2 w-[20rem] h-[15rem]">
      <div className="flex items-center mb-2">
        <IcecreamIcon
          className="text-secondary"
          fontSize="extraSmall"
        ></IcecreamIcon>
        <p className="text-gray-300 ml-1 text-md font-semibold">
          BreakFast
        </p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col gap-2">
          {foodsItems.map((food, index) => (
            <CardContent key={index} className="p-2 bg-surface-mid-light rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <p className="text-surface-light text-sm font-semibold">
                    {food.foodName}
                  </p>
                  <p className="text-surface-light text-xs">
                    {food.calories} calories
                  </p>
                </div>
              </div>
            </CardContent>
          ))}
        </div>
      </div>
      <Button
        className="mt-6 w-[9rem] bg-secondary hover:bg-primary duration-200 "
        type="submit"
      >
        Add Food
      </Button>
    </div>
  );
};

export default LogSnack;

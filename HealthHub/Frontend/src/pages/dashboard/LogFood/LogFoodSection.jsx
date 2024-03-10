import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import IcecreamIcon from "@mui/icons-material/Icecream";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";

const LogFoodSection = ({ foodsItems, sectionName }) => {
  const Icon =
    sectionName === "Breakfast"
      ? BreakfastDiningIcon
      : sectionName === "Lunch"
      ? LunchDiningIcon
      : sectionName === "Snack"
      ? IcecreamIcon
      : DinnerDiningIcon;
  return (
    <div className="flex flex-col mt-4 px-1 mb-2 w-[26rem] h-[15rem]">
      <div className="flex items-center mb-2">
        <Icon className="text-secondary" fontSize="small" />
        <p className="text-gray-300 ml-1 text-md font-semibold">{sectionName}</p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col gap-2">
          {foodsItems.map((food, index) => (
            <CardContent key={index} className="p-2 bg-green-900 rounded-lg">
              <div className="flex  gap-2 justify-between">
                <div>
                  <p className="text-surface-light text-sm font-semibold">
                    {food.foodName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Serving size: {food.servingSize}g
                  </p>
                  <p className="text-gray-500 text-sm">
                  Number of servings: {food.numberOfServings}
                  </p>
                </div>

                <div>
                  <p className="text-surface-light text-xs">
                    {food.calories} calories
                  </p>
                  <p className="text-surface-light text-xs">
                    {food.protein} proteins
                  </p>
                  <p className="text-surface-light text-xs">
                    {food.carbohydrates} carbohydrates
                  </p>
                  <p className="text-surface-light text-xs">{food.fat} fats</p>
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

export default LogFoodSection;

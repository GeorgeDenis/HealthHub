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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const breakfastText =
  "No breakfast items found. Tap the '+' to add your first meal of the day!";
const lunchText = "No lunch items found. Tap the '+' to add your midday meal!";
const dinnerText = "No dinner items found. Tap the '+' to add your last meal!";
const snackText = "No snack items found. Tap the '+' to add your snack!";

const LogFoodSection = ({ foodsItems, sectionName }) => {
  const Icon =
    sectionName === "Breakfast"
      ? BreakfastDiningIcon
      : sectionName === "Lunch"
      ? LunchDiningIcon
      : sectionName === "Snack"
      ? IcecreamIcon
      : DinnerDiningIcon;
  const promptText =
    sectionName === "Breakfast"
      ? breakfastText
      : sectionName === "Lunch"
      ? lunchText
      : sectionName === "Dinner"
      ? dinnerText
      : snackText;

  return (
    <div className="flex flex-col mt-4 px-1 mb-2 lg:w-[26rem] lg:h-[15rem] xl:w-[90%]">
      <div className="flex items-center mb-2">
        <Icon className="text-secondary" fontSize="small" />
        <p className="text-gray-300 ml-1 text-md font-semibold">
          {sectionName}
        </p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-2">
          {foodsItems.length > 0 ? (
            foodsItems.map((food, index) => (
              <CardContent key={index} className="p-2 bg-green-900 rounded-lg">
                <div className="flex gap-2 justify-between">
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
                    <p className="text-surface-light text-xs">
                      {food.fat} fats
                    </p>
                  </div>
                </div>
              </CardContent>
            ))
          ) : (
            <CardContent className="p-2 bg-green-900 rounded-lg w-full flex justify-start items-center">
              <p className="text-gray-500 text-sm">{promptText}</p>
            </CardContent>
          )}
        </div>
      </div>
      <Button
        className="mt-5 w-14 h-8 bg-secondary hover:bg-primary duration-200 flex justify-center items-center"
        size="sm"
      >
        <AddCircleIcon className="text-surface-light w-6 h-6" />
      </Button>
    </div>
  );
};

export default LogFoodSection;

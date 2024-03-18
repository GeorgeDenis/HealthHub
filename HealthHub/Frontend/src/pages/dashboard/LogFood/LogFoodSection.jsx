import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent, Modal } from "@mui/material";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import IcecreamIcon from "@mui/icons-material/Icecream";
import BreakfastDiningIcon from "@mui/icons-material/BreakfastDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FoodModal from "./FoodModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const breakfastText =
  "No breakfast items found. Tap the '+' to add your first meal of the day!";
const lunchText = "No lunch items found. Tap the '+' to add your midday meal!";
const dinnerText = "No dinner items found. Tap the '+' to add your last meal!";
const snackText = "No snack items found. Tap the '+' to add your snack!";

const LogFoodSection = ({ foodsItems, sectionName, fetchLoggedFoods }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const currentUser = useUser();

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const Icon =
    sectionName === "Breakfast"
      ? BreakfastDiningIcon
      : sectionName === "Lunch"
      ? LunchDiningIcon
      : sectionName === "Snack"
      ? IcecreamIcon
      : DinnerDiningIcon;
  const Emoji =
    sectionName === "Breakfast"
      ? "🥑"
      : sectionName === "Lunch"
      ? "🍨"
      : sectionName === "Snack"
      ? "🌮"
      : "🥩";
  const promptText =
    sectionName === "Breakfast"
      ? breakfastText
      : sectionName === "Lunch"
      ? lunchText
      : sectionName === "Dinner"
      ? dinnerText
      : snackText;
  const calculateCalories = () => {
    return foodsItems.reduce((acc, food) => acc + food.calories, 0);
  };
  const handleDeleteFood = async (foodId) => {
    try {
      const response = await api.delete(`/api/v1/LoggedFood/${foodId}`, {
        params: { loggedFoodId: foodId, userId: currentUser?.userId },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Food deleted successfully");
        fetchLoggedFoods();
      }
    } catch (error) {
      toast.error("An error occurred while deleting the food");
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-2  px-1 mb-10 md:mb-2 lg:w-[26rem] lg:h-[23rem] xl:w-[90%] ">
        <div className="flex justify-between mb-2">
          {/* <Icon className="text-secondary" fontSize="small" /> */}
          <div className="flex">
            <p className="text-xl">{Emoji}</p>
            <p className="text-gray-300 ml-1 text-md font-semibold">
              {sectionName}
            </p>
          </div>
          {calculateCalories() > 0 && <p className="text-surface-light rounded-md bg-green-900 p-1 text-sm cursor-pointer">
            {`${calculateCalories()} kcal`}{" "}
          </p>}
        </div>
        <div
          className="text-surface-light overflow-auto max-h-[12rem]"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col gap-2">
            {foodsItems.length > 0 ? (
              foodsItems.map((food, index) => (
                <CardContent
                  key={index}
                  className="p-2 bg-green-900 rounded-lg"
                >
                  <div className="flex gap-2 justify-between">
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-surface-light text-sm font-semibold">
                          {food.foodName}
                        </p>
                        <EditIcon
                          className="cursor-pointer hover:text-green-400"
                          fontSize="small"
                        />
                      </div>

                      {food.servingSize > 0 && (
                        <p className="text-gray-500 text-sm">
                          Serving size: {food.servingSize}g
                        </p>
                      )}
                      {food.numberOfServings > 0 && (
                        <p className="text-gray-500 text-sm">
                          Number of servings: {food.numberOfServings}
                        </p>
                      )}
                    </div>
                    <div className="flex text-sm cursor-pointer">
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
                      <DeleteIcon
                        className="cursor-pointer hover:text-red-500"
                        fontSize="small"
                        onClick={() => handleDeleteFood(food.id)}
                      />
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
        <button
          className="mt-5 w-14 h-8 bg-secondary hover:bg-primary duration-200 rounded-lg p-2 flex justify-center items-center"
          onClick={handleOpen}
        >
          <AddCircleIcon className="text-surface-light w-6 h-6" />
        </button>
      </div>
      <FoodModal
        modalOpen={modalOpen}
        handleClose={handleClose}
        sectionName={sectionName}
        refetchLoggedFoods={fetchLoggedFoods}
      />
    </div>
  );
};

export default LogFoodSection;

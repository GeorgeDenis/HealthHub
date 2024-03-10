import React, { useState, useEffect } from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LogFoodDatePicker from "./LogFoodDatePicker";
const CaloriesRemaining = ({
  dateChange,
  selectedDate,
  totalFoodsCalories,
  totalCardioCalories,
  totalNutrients,
}) => {
  const [calories, setCalories] = useState(0);
  const [macronutrientsNeeded, setMacronutrientsNeeded] = useState({});
  const [isCaloriesShown, setIsCaloriesShown] = useState(true);
  const currentUser = useUser();

  useEffect(() => {
    fetchCalories();
  }, [selectedDate]);

  const fetchCalories = async () => {
    try {
      const response = await api.get(
        `/api/v1/Users/calories/${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setCalories(response.data.calories);
        if (response.data.calories > 0) {
          console.log(response.data.calories);
          fetchMacronutrientsNeeded(response.data.calories);
        }
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  const fetchMacronutrientsNeeded = async (caloriesToCalculate) => {
    try {
      const response = await api.get(
        `/api/v1/Macronutrients/calories-by-macronutrients?`,
        {
          params: {
            userId: currentUser?.userId,
            calories: caloriesToCalculate,
          },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setMacronutrientsNeeded({
          protein: response.data.proteinQuantity,
          carbohydrates: response.data.carbohydratesQuantity,
          fat: response.data.fatsQuantity,
        });
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  return (
    <div className="mt-2 flex flex-col items-center rounded-lg bg-surface-dark max-w-[40rem] p-4">
      <LogFoodDatePicker selectedDate={selectedDate} onChange={dateChange} />
      {isCaloriesShown && (
        <>
          <Typography
            variant="h6"
            className="mb-1 text-surface-light self-start text-md"
          >
            {"Calories Remaining:"}
          </Typography>
          <div className="flex gap-6 items-center">
            <div className="flex flex-col items-center">
              <Typography className="mb-1 text-surface-light">
                {calories}
              </Typography>
              <Typography className="mb-1 text-surface-light">
                {"Goal"}
              </Typography>
            </div>
            <Typography className="mb-1 text-surface-light">-</Typography>
            <div className="flex flex-col items-center">
              <Typography className="mb-1 text-surface-light">
                {totalFoodsCalories}
              </Typography>
              <Typography className="mb-1 text-surface-light">
                {"Food"}
              </Typography>
            </div>
            <Typography className="mb-1 text-surface-light">+</Typography>
            <div className="flex flex-col items-center">
              <Typography className="mb-1 text-surface-light">
                {totalCardioCalories}
              </Typography>
              <Typography className="mb-1 text-surface-light">
                {"Exercise"}
              </Typography>
            </div>
            <Typography className="mb-1 text-surface-light">=</Typography>
            <div className="flex flex-col items-center">
              <Typography className="mb-1 text-surface-light">
                {calories - totalFoodsCalories - totalCardioCalories}
              </Typography>
              <Typography className="mb-1 text-surface-light">
                {"Remaining"}
              </Typography>
            </div>
          </div>
        </>
      )}
      {!isCaloriesShown && (
        <div className="flex gap-10">
          <p className="text-surface-light">{macronutrientsNeeded.protein}</p>
          <p className="text-surface-light">{macronutrientsNeeded.carbohydrates}</p>
          <p className="text-surface-light">{macronutrientsNeeded.fat}</p>
        </div>
        
      )}
    </div>
  );
};

export default CaloriesRemaining;

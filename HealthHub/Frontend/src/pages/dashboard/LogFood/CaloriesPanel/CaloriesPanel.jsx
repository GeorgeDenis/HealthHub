import React, { useState, useEffect } from "react";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LogFoodDatePicker from "../LogFoodDatePicker";
import NutrientsRemaining from "./NutrientsRemaining";
import CaloriesRemaining from "./CaloriesRemaining";

const CaloriePanel = ({
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
    <div className="mt-2 flex flex-col items-center rounded-lg bg-surface-dark w-[19rem] md:w-[23rem] lg:w-[30rem] max-w-[40rem] p-5">
      <LogFoodDatePicker selectedDate={selectedDate} onChange={dateChange} />
      <div
        className={`transition-opacity duration-500 ${
          isCaloriesShown ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {isCaloriesShown && (
          <CaloriesRemaining
            calories={calories}
            totalFoodsCalories={totalFoodsCalories}
            totalCardioCalories={totalCardioCalories}
            setIsCaloriesShown={setIsCaloriesShown}
          />
        )}
      </div>
      <div
        className={`transition-opacity duration-500 ${
          !isCaloriesShown ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {!isCaloriesShown && (
          <NutrientsRemaining
            totalNutrients={totalNutrients}
            macronutrientsNeeded={macronutrientsNeeded}
            calories={calories - totalFoodsCalories - totalCardioCalories}
            setIsCaloriesShown={setIsCaloriesShown}
          />
        )}
      </div>
    </div>
  );
};

export default CaloriePanel;

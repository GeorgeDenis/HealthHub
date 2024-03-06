import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import CaloriesRemaining from "./CaloriesRemaining";
import LogSection from "./LogSection";
import LogBreakfast from "./LogBreakfast";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";

const LogFood = () => {
  const currentUser = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [breakfastFood, setBreakfastFood] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [totalBreakfastCalories, setTotalBreakfastCalories] = useState(0);
  const [totalCardioCalories, setTotalCardioCalories] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    fetchLoggedFoods();
    fetchLoggedExercises();
  }, [selectedDate]);
  useEffect(() => {
    const totalCalories = breakfastFood.reduce(
      (acc, food) => acc + food.calories,
      0,
    );
    setTotalBreakfastCalories(totalCalories);
    const totalCardioCalories = cardioExercises.reduce(
      (acc, exercise) => acc + exercise.caloriesBurned,
      0,
    );
    setTotalCardioCalories(totalCardioCalories);
  }, [breakfastFood, cardioExercises]);

  const fetchLoggedFoods = async () => {
    setBreakfastFood([]);
    try {
      const response = await api.get(`/api/v1/LoggedFood`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const foodFetch = response.data.loggedFoods;
        foodFetch.forEach((food) => {
          if (food.mealType === 1) {
            const foodItem = {
              foodName: food.foodName,
              calories: food.calories,
            };
            setBreakfastFood((prev) => [...prev, foodItem]);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  const fetchLoggedExercises = async () => {
    setCardioExercises([]);
    try {
      const response = await api.get(`/api/v1/LoggedCardioExercise`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const cardioExercisesFetch = response.data.loggedCardioExercises;
        cardioExercisesFetch.forEach((exercise) => {
          const exerciseItem = {
            exerciseName: exercise.exerciseName,
            caloriesBurned: exercise.caloriesBurned,
          };
          setCardioExercises((prev) => [...prev, exerciseItem]);
        });
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };

  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-surface-dark">
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-48 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center">
        <CaloriesRemaining
          dateChange={handleDateChange}
          selectedDate={selectedDate}
          totalBreakfastCalories={totalBreakfastCalories}
          totalCardioCalories={totalCardioCalories}
        />

        <div className="flex gap-2">
          <div>
            <LogBreakfast />
            <LogSection sectionName={"Lunch"} buttonName={"Add Food"} />
            <LogSection sectionName={"Dinner"} buttonName={"Add Food"} />
          </div>
          <div>
            <LogSection sectionName={"Snacks"} buttonName={"Add Food"} />
            <LogSection sectionName={"Exercises"} buttonName={"Add Exercise"} />
            <LogSection sectionName={"Water"} buttonName={"Add Water"} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default LogFood;

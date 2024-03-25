import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import CaloriePanel from "./CaloriesPanel/CaloriesPanel";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LogFoodSection from "./LogFoodSection";
import LogExercise from "./LogExercise";
import LogWater from "./LogWater";

const calculateTotalNutrient = (nutrient, ...foodArrays) => {
  return foodArrays.reduce((totalNutrient, currentArray) => {
    const totalForCurrentArray = currentArray.reduce(
      (acc, food) => acc + food[nutrient],
      0,
    );
    return totalNutrient + totalForCurrentArray;
  }, 0);
};

const LogFood = () => {
  const currentUser = useUser();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [breakfastFoods, setBreakfastFoods] = useState([]);
  const [lunchFoods, setLunchFoods] = useState([]);
  const [dinnerFoods, setDinnerFoods] = useState([]);
  const [snackFoods, setSnackFoods] = useState([]);

  const [cardioExercises, setCardioExercises] = useState([]);
  const [strengthExercises, setStrengthExercises] = useState([]);

  const [totalCardioCalories, setTotalCardioCalories] = useState(0);
  const [totalNutrients, setTotalNutrients] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    fetchLoggedFoods();
    fetchLoggedCardioExercises();
    fetchLoggedStrengthExercises();
    fetchLoggedFoodsNutrients();
  }, [selectedDate]);
  useEffect(() => {
    fetchLoggedFoodsNutrients();
  }, [
    breakfastFoods,
    lunchFoods,
    dinnerFoods,
    snackFoods,
    cardioExercises,
    strengthExercises,
  ]);

  useEffect(() => {
    const totalCardioCalories = cardioExercises.reduce(
      (acc, exercise) => acc + exercise.caloriesBurned,
      0,
    );
    setTotalCardioCalories(totalCardioCalories);
  }, [cardioExercises]);

  const fetchLoggedFoods = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedFood`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        let breakfastFoodsTemp = [];
        let lunchFoodsTemp = [];
        let dinnerFoodsTemp = [];
        let snackFoodsTemp = [];

        response.data.loggedFoods.forEach((food) => {
          const foodItem = {
            id: food.id,
            foodName: food.foodName,
            servingSize: food.servingSize,
            numberOfServings: food.numberOfServings,
            calories: food.calories,
            protein: food.protein,
            carbohydrates: food.carbohydrates,
            fat: food.fat,
            mealType: food.mealType,
          };

          switch (food.mealType) {
            case 1:
              breakfastFoodsTemp.push(foodItem);
              break;
            case 2:
              lunchFoodsTemp.push(foodItem);
              break;
            case 3:
              dinnerFoodsTemp.push(foodItem);
              break;
            case 4:
              snackFoodsTemp.push(foodItem);
              break;
            default:
              break;
          }
        });

        breakfastFoodsTemp.sort((a, b) => a.foodName.localeCompare(b.foodName));
        lunchFoodsTemp.sort((a, b) => a.foodName.localeCompare(b.foodName));
        dinnerFoodsTemp.sort((a, b) => a.foodName.localeCompare(b.foodName));
        snackFoodsTemp.sort((a, b) => a.foodName.localeCompare(b.foodName));

        setBreakfastFoods(breakfastFoodsTemp);
        setLunchFoods(lunchFoodsTemp);
        setDinnerFoods(dinnerFoodsTemp);
        setSnackFoods(snackFoodsTemp);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const fetchLoggedCardioExercises = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedCardioExercise`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const newCardioExercises = response.data.loggedCardioExercises.map(
          (exercise) => ({
            id: exercise.loggedCardioExerciseId,
            exerciseName: exercise.name,
            duration: exercise.duration,
            caloriesBurned: exercise.caloriesBurned,
          }),
        );

        setCardioExercises(newCardioExercises);
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  const fetchLoggedStrengthExercises = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedStrengthExercise`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const newStrengthExercises = response.data.loggedStrengthExercises.map(
          (exercise) => ({
            id: exercise.loggedStrengthExerciseId,
            exerciseName: exercise.name,
            muscleGroup: exercise.muscleGroup,
            sets: exercise.numberOfSets,
            weightPerSet: exercise.weightPerSet,
          }),
        );

        setStrengthExercises(newStrengthExercises);
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  const fetchLoggedFoodsNutrients = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedFood/get-nutrients`, {
        params: { userId: currentUser?.userId, dateLogged: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        setTotalNutrients(response.data.loggedFoodNutrients);
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
      <Card className="mx-3 -mt-48 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center justify-center">
        <CaloriePanel
          dateChange={handleDateChange}
          selectedDate={selectedDate}
          totalFoodsCalories={totalNutrients.calories || 0}
          totalNutrients={totalNutrients}
          totalCardioCalories={totalCardioCalories}
        />
        <div className="md:w-[40rem] lg:w-[55rem] xl:w-3/4 md:max-h-[80rem] md:grid grid-cols-2 grid-rows-3 p-4">
          <div>
            <LogFoodSection
              fetchLoggedFoods={fetchLoggedFoods}
              foodsItems={breakfastFoods}
              sectionName={"Breakfast"}
            />
            <LogFoodSection
              fetchLoggedFoods={fetchLoggedFoods}
              foodsItems={lunchFoods}
              sectionName={"Lunch"}
            />
            <LogFoodSection
              fetchLoggedFoods={fetchLoggedFoods}
              foodsItems={dinnerFoods}
              sectionName={"Dinner"}
            />
          </div>
          <div>
            <LogFoodSection
              fetchLoggedFoods={fetchLoggedFoods}
              foodsItems={snackFoods}
              sectionName={"Snack"}
            />
            <LogExercise
              cardioExercises={cardioExercises}
              strengthExercises={strengthExercises}
              fetchLoggedCardioExercises={fetchLoggedCardioExercises}
              fetchLoggedStrengthExercises={fetchLoggedStrengthExercises}
            />
            <LogWater selectedDate={selectedDate} />
          </div>
        </div>
      </Card>
    </>
  );
};

export default LogFood;

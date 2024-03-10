import React, { useEffect, useState } from "react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import CaloriesRemaining from "./CaloriesRemaining";
import LogSection from "./LogSection";
import LogBreakfast from "./LogFoods/LogBreakfast";
import api from "../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LogLunch from "./LogFoods/LogLunch";
import LogDinner from "./LogFoods/LogDinner";
import LogSnack from "./LogFoods/LogSnack";
import LogFoodSection from "./LogFoodSection";
import LogExercise from "./LogExercise";
import LogWater from "./LogWater";

const calculateTotalNutrient = (nutrient, ...foodArrays) => {
  return foodArrays.reduce((totalNutrient, currentArray) => {
    const totalForCurrentArray = currentArray.reduce((acc, food) => acc + food[nutrient], 0);
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
  const [totalCardioCalories, setTotalCardioCalories] = useState(0);
  const [totalFoodsCalories, setTotalFoodCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalNutrients, setTotalNutrients] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  useEffect(() => {
    fetchLoggedFoods();
    fetchLoggedExercises();
    fetchLoggedFoodsNutrients();
  }, [selectedDate]);

  // useEffect(() => {
  //   const totalCalories = calculateTotalNutrient('calories', breakfastFoods, lunchFoods, dinnerFoods, snackFoods);
  //   setTotalFoodCalories(totalCalories);

  //   const totalProtein = calculateTotalNutrient('protein', breakfastFoods, lunchFoods, dinnerFoods, snackFoods);
  //   setTotalProtein(totalProtein);

  //   const totalFat = calculateTotalNutrient('fat', breakfastFoods, lunchFoods, dinnerFoods, snackFoods);
  //   setTotalFat(totalFat);

  //   const totalCarbohydrates = calculateTotalNutrient('carbohydrates', breakfastFoods, lunchFoods, dinnerFoods, snackFoods);
  //   setTotalCarbohydrates(totalCarbohydrates);


  // }, [breakfastFoods, lunchFoods, dinnerFoods, snackFoods]);

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
        setBreakfastFoods([]);
        setLunchFoods([]);
        setDinnerFoods([]);
        setSnackFoods([]);

        response.data.loggedFoods.forEach(food => {
          const foodItem = {
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
              setBreakfastFoods(prev => [...prev, foodItem]);
              break;
            case 2:
              setLunchFoods(prev => [...prev, foodItem]);
              break;
            case 3:
              setDinnerFoods(prev => [...prev, foodItem]);
              break;
            case 4:
              setSnackFoods(prev => [...prev, foodItem]);
              break;
            default:
              break;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const fetchLoggedExercises = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedCardioExercise`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const newCardioExercises = response.data.loggedCardioExercises.map((exercise) => ({
          exerciseName: exercise.exerciseName,
          caloriesBurned: exercise.caloriesBurned,
        }));

        setCardioExercises(newCardioExercises);
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
      <Card className="mx-3 -mt-48 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center">
        <CaloriesRemaining
          dateChange={handleDateChange}
          selectedDate={selectedDate}
          totalFoodsCalories={totalNutrients.calories || 0}
          totalCardioCalories={totalCardioCalories}
        />
        <p>{totalNutrients.protein}</p>
        <p>{totalNutrients.carbohydrates}</p>
        <p>{totalNutrients.fat}</p>
        <div className="md:w-[80rem] grid grid-cols-2 grid-rows-3  p-4">
          <div>
            <LogFoodSection foodsItems={breakfastFoods} sectionName={"Breakfast"} />
            <LogFoodSection foodsItems={lunchFoods} sectionName={"Lunch"}/>
            <LogFoodSection foodsItems={dinnerFoods} sectionName={"Dinner"}/>
          </div>
          <div>
            <LogFoodSection foodsItems={snackFoods} sectionName={"Snack"} buttonName={"Add Food"} />
            <LogExercise foodsItems={snackFoods}/>
            <LogWater selectedDate={selectedDate}/>
          </div>
        </div>
      </Card>
    </>
  );
};

export default LogFood;

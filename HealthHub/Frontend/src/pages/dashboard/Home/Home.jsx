import React, { useEffect, useState } from "react";
import { Typography, Card } from "@material-tailwind/react";

import { useUser } from "@/context/LoginRequired";
import api from "../../../services/api";
import { toast } from "react-toastify";
import CaloriesBanner from "./Banners/CaloriesBanner";
import NutrientsBanner from "./Banners/NutrientsBanner";
import FatIntakeBanner from "./Banners/FatIntakeBanner";
import LoggedWeights from "./LoggedWeights";

export function Home() {
  const currentUser = useUser();
  const time = new Date().getHours();
  const [calories, setCalories] = useState(0);
  const [totalNutrients, setTotalNutrients] = useState({});
  const [currentUserMacronutrients, setCurrentUserMacronutrients] = useState(
    {},
  );
  const [currentWeight, setCurrentWeight] = useState({
    weight: 0,
    dateLogged: "",
  });
  useEffect(() => {
    fetchCalories();
    fetchCurrentUserWeight();
    fetchLoggedFoodsNutrients();
  }, []);
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
        fetchCurrentUserMacronutrients(response.data.calories);
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  const fetchCurrentUserMacronutrients = async (caloriesRequired) => {
    try {
      const response = await api.get(
        `/api/v1/Macronutrients/calories-by-macronutrients`,
        {
          params: {
            userId: currentUser.userId,
            calories: caloriesRequired,
          },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setCurrentUserMacronutrients({
          protein: response.data?.proteinQuantity,
          carbohydrates: response.data?.carbohydratesQuantity,
          fats: response.data?.fatsQuantity,
        });
      } else {
        toast.error("Failed to fetch user macronutrients");
      }
    } catch (error) {
      toast.error("Error fetching user macronutrients:", error);
    }
  };
  const fetchCurrentUserWeight = async () => {
    try {
      const response = await api.get(
        `/api/v1/LoggedWeight/last-logged-weight/${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setCurrentWeight({
          weight: response.data.weight,
          dateLogged: response.data.dateLogged,
        });
      } else {
        toast.error("Failed to fetch user last recorded weight");
      }
    } catch (error) {
      toast.error("Error fetching user last recorded weight:", error);
    }
  };
  const fetchLoggedFoodsNutrients = async () => {
    const selectedDate = new Date().toISOString();
    console.log(selectedDate);
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
    <div className=" text-surface-light">
      {/* main container */}
      <div className="mb-8">
        <h2 className="text-2xl md:text-4xl font-bold p-4">
          Good{" "}
          {time < 4 || time >= 18
            ? "evening"
            : time <= 12
            ? "morning"
            : "afternoon"}
          , <span className="text-white">{currentUser?.username}</span>!
        </h2>
      </div>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl "
       style={{backgroundImage: "url('../../../public/img/banner2.jpg')", backgroundPosition: 'center 43%', backgroundSize: 'cover'}}>
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-32 md:-mt-28 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center justify-center p-4">
        <div className="flex flex-col 2xl:flex-row gap-8 w-full justify-center items-center mt-5">
          <CaloriesBanner
            caloriesNeeded={calories}
            caloriesFromFood={totalNutrients.calories || 0}
          />
          <NutrientsBanner
            totalNutrients={totalNutrients}
            macronutrientsNeeded={currentUserMacronutrients}
          />
          <FatIntakeBanner
            fatsNeeded={currentUserMacronutrients.fats}
            fatsFromFood={totalNutrients.fat}
          />
        </div>
        <LoggedWeights />

        <div className="text-center flex flex-col items-center">
          <Typography variant="h4" className="text-white p-2">
            Calories Remaining: {calories}
          </Typography>
          {currentUserMacronutrients && (
            <div>
              <Typography variant="h4" className="text-white p-2">
                Proteins Remaining: {currentUserMacronutrients.protein}
              </Typography>
              <Typography variant="h4" className="text-white p-2">
                Carbohydrates Remaining:{" "}
                {currentUserMacronutrients.carbohydrates}
              </Typography>
              <Typography variant="h4" className="text-white p-2">
                Fats Remaining: {currentUserMacronutrients.fats}
              </Typography>
            </div>
          )}
          {currentWeight && (
            <div>
              <Typography variant="h4" className="text-white p-2">
                Last recorded weight: {currentWeight.weight} kg on{" "}
                {new Date(currentWeight.dateLogged).toLocaleDateString()}
              </Typography>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default Home;

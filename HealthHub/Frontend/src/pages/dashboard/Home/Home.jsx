import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { useUser } from "@/context/LoginRequired";
import api from "../../../services/api";
import { toast } from "react-toastify";

export function Home() {
  const currentUser = useUser();
  const time = new Date().getHours();
  const [calories, setCalories] = React.useState(0);
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

  return (
    <div className="mt-10 text-surface-light">
      <div className="mb-16">
        <h2 className="text-4xl font-bold">
          Good{" "}
          {time < 4 || time >= 18
            ? "evening"
            : time <= 12
            ? "morning"
            : "afternoon"}
          , <span className="text-white">{currentUser?.username}</span>!
        </h2>
      </div>
      {/* main container */}
      <div className="text-center">
        <Typography variant="h4" className="text-white p-2">
          Calories Remaining: {calories}
        </Typography>
        {currentUserMacronutrients && (
          <div>
            <Typography variant="h4" className="text-white p-2">
              Proteins Remaining: {currentUserMacronutrients.protein}
            </Typography>
            <Typography variant="h4" className="text-white p-2">
              Carbohydrates Remaining: {currentUserMacronutrients.carbohydrates}
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
    </div>
  );
}

export default Home;

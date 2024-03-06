import React, { useState, useEffect } from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LogFoodDatePicker from "./LogFoodDatePicker";
const CaloriesRemaining = ({dateChange,selectedDate,totalBreakfastCalories,totalCardioCalories}) => {
  const [calories, setCalories] = useState(0);
  const currentUser = useUser();

  useEffect(() => {
    fetchCalories();
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
      }
    } catch (error) {
      console.error("Error fetching calories:", error);
    }
  };
  return (
    <div className="mt-2 flex flex-col items-center rounded-lg bg-surface-dark max-w-[40rem] p-4">
      <LogFoodDatePicker
        selectedDate={selectedDate}
        onChange={dateChange}
        
      />
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
          <Typography className="mb-1 text-surface-light">{"Goal"}</Typography>
        </div>
        <Typography className="mb-1 text-surface-light">-</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">{totalBreakfastCalories}</Typography>
          <Typography className="mb-1 text-surface-light">{"Food"}</Typography>
        </div>
        <Typography className="mb-1 text-surface-light">+</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">{totalCardioCalories}</Typography>
          <Typography className="mb-1 text-surface-light">
            {"Exercise"}
          </Typography>
        </div>
        <Typography className="mb-1 text-surface-light">=</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">{calories - totalBreakfastCalories - totalCardioCalories}</Typography>
          <Typography className="mb-1 text-surface-light">
            {"Remaining"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CaloriesRemaining;

import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Input, Typography } from "@material-tailwind/react";

function WaterField({ value, isInEditMode, editedValue, onChangeEditedValue }) {
  return (
    <div className="w-8">
      <Input
        value={editedValue || ""}
        onChange={(e) => onChangeEditedValue(e.target.value)}
        type={"text"}
        variant={"outlined"}
        label={"Water"}
        size={"md"}
        color={"green"}
        className={"text-white"}
        crossOrigin={undefined}
      />
    </div>
  );
}
const QuickWaterAdd = ({ addWater, waterValue }) => {
  return (
    <p
      className="text-green-500 text-sm font-semibold underline cursor-pointer"
      onClick={() => addWater(waterValue)}
    >
      +{waterValue} ml
    </p>
  );
};

const LogWater = ({ selectedDate }) => {
  const currentUser = useUser();
  const [waterId, setWaterId] = useState(0);
  const [waterLevel, setWaterLevel] = useState(0);
  const [loggedWater, setLoggedWater] = useState(0);
  const [customWaterValue, setCustomWaterValue] = useState(0);

  const [editedWaterValue, setEditedWaterValue] = useState(0);
  const [isEditWaterLevel, setIsEditWaterLevel] = useState(false);

  const glassHeight = 1920;

  const addWater = (amount) => {
    logWaterIntake(loggedWater + amount).then(() => fetchLoggedWater());
  };
  const handleCustomWaterValue = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    setCustomWaterValue(value);
  };

  useEffect(() => {
    setCustomWaterValue(0);
    fetchLoggedWater();
  }, [selectedDate]);

  const handleEditWaterLevel = () => {
    setIsEditWaterLevel(false);
    if (isNaN(editedWaterValue) || editedWaterValue < 0) return;
    logWaterIntake(editedWaterValue).then(() => fetchLoggedWater());
  };

  const fetchLoggedWater = async () => {
    try {
      const response = await api.get(`/api/v1/LoggedWater`, {
        params: { userId: currentUser?.userId, date: selectedDate },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      if (response.status === 200) {
        const fetchedWaterLevel = response.data.loggedWater.amount;
        setLoggedWater(fetchedWaterLevel);
        setWaterId(response.data.loggedWater.id);
      }
    } catch (error) {
      console.error("Error fetching logged water:", error);
    }
  };
  const logWaterIntake = async (waterAmount) => {
    try {
      const response = await api.put(
        "/api/v1/LoggedWater",
        {
          loggedWaterId: waterId,
          userId: currentUser?.userId,
          amount: waterAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Water intake logged successfully");
        setCustomWaterValue(0);
      }
    } catch (error) {
      console.error("Error logging water intake:", error);
      toast.error("Error logging water intake");
    }
  };

  const fillHeight = (Math.min(loggedWater, glassHeight) / glassHeight) * 100;
  return (
    <div className="flex flex-col mt-4 px-1 mb-2 lg:w-[26rem] lg:h-[21rem] xl:w-[90%] min-h-[24rem]">
      <div className="flex items-center mb-2">
        <LocalDrinkIcon
          className="text-secondary"
          fontSize="extraSmall"
        ></LocalDrinkIcon>
        <p className="text-gray-300 ml-1 text-md font-semibold">
          Water Consumption
        </p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[16rem]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col gap-2">
          <CardContent className="p-2 bg-green-900 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="text-surface-light text-sm font-bold">
                    Today's Water Total:
                  </p>
                  {!isEditWaterLevel ? (
                    <p
                      className="text-surface-light hover:underline text-sm hofont-semibold cursor-pointer"
                      onClick={() => setIsEditWaterLevel(true)}
                    >
                      {loggedWater} ml
                    </p>
                  ) : (
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        className="w-[3rem] h-8 p-2 bg-surface-mid-light rounded-lg text-surface-light text-sm"
                        value={editedWaterValue}
                        onChange={(e) => setEditedWaterValue(e.target.value)}
                      />
                      <Button
                        className="w-[3rem] h-8 bg-secondary hover:bg-primary duration-200 flex justify-center items-center"
                        size="sm"
                        onClick={() => handleEditWaterLevel()}
                      >
                        Save
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-3/4 text-justify">
                    <p className="text-surface-light text-xs">
                      Aim to drink at least 1920 milliliters of water today. You
                      can quick add common sizes or enter a custom amount.
                    </p>
                    <div>
                      <p className="text-surface-light text-sm font-semibold">
                        Quick Add
                      </p>
                      <div className="w-2/3 text-justify flex gap-2">
                        <QuickWaterAdd addWater={addWater} waterValue={250} />
                        <QuickWaterAdd addWater={addWater} waterValue={500} />
                        <QuickWaterAdd addWater={addWater} waterValue={1000} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center p-2">
                    <div className="relative border-2 border-gray-600 rounded w-12 h-24">
                      <div
                        className="absolute bottom-0 bg-blue-200 w-full"
                        style={{
                          height: `${fillHeight}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-surface-light text-sm font-semibold">
                    Custom Amount
                  </p>
                  <div className="flex gap-2 items-center">
                    <input
                      className="w-[4rem] h-8 p-2 bg-surface-mid-light rounded-lg text-surface-light"
                      value={customWaterValue}
                      onChange={handleCustomWaterValue}
                    />
                    <Button
                      className="bg-secondary hover:bg-primary duration-200 w-7 h-8 flex justify-center items-center"
                      onClick={() => addWater(customWaterValue)}
                    >
                      <AddCircleIcon className="text-surface-light" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default LogWater;

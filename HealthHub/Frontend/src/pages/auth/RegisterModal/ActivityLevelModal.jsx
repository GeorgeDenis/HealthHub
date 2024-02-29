import React, { useEffect, useState } from "react";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import ActivityCard from "./ActivityCard";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ActivityLevelModal = () => {
  const [selectedActivity, setSelectedActivity] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedGoal, selectedWeeklyGoal } = location.state || {};
  const handleSelectActivity = (activityLevel) => {
    setSelectedActivity(activityLevel);
  };
  const handleBack = () => {
    navigate("/auth/set-weekly-goal",{state: {selectedGoal}});
  };
  const handleNext = () => {
    if (!selectedActivity) {
      toast.error("Please select an activity level");
      return;
    }
    const selectedActivityLevelConverted =
      selectedActivity === "Sedentary"
        ? 1
        : selectedActivity === "Lightly Active"
        ? 2
        : selectedActivity === "Active"
        ? 3
        : 4;
    navigate("/auth/main-info-card", {
      state: {
        selectedActivity: selectedActivityLevelConverted,
        selectedWeeklyGoal,
        selectedGoal,
      },
    });
  };
  useEffect(() => {
    if (!selectedGoal || !selectedWeeklyGoal) {
      navigate("/auth/set-weekly-goal");
    }
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[27rem] bg-surface-dark shadow-lg p-4 rounded">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
        <div className="relative h-6 flex items-center justify-center">
          <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[60%] bg-surface-mid "></div>
          <div className="relative text-black-700 font-medium text-sm">60%</div>
        </div>
      </div>
      <Typography
        variant="h4"
        className="text-white p-2 text-center  select-none"
      >
        What is your baseline activity level?
      </Typography>
      <div className="flex flex-col justify-between h-full">
        <div className="m-2 flex flex-col gap-2">
          <ActivityCard
            activityLevel="Sedentary"
            activityText="Spend the most of the day sitting"
            selected={selectedActivity === "Sedentary"}
            onSelect={() => handleSelectActivity("Sedentary")}
          />
          <ActivityCard
            activityLevel="Lightly Active"
            activityText="Spend a good part of the day on your feet"
            selected={selectedActivity === "Lightly Active"}
            onSelect={() => handleSelectActivity("Lightly Active")}
          />
          <ActivityCard
            activityLevel="Active"
            activityText="Spend a good part of the day doing some physical activity"
            selected={selectedActivity === "Active"}
            onSelect={() => handleSelectActivity("Active")}
          />
          <ActivityCard
            activityLevel="Very Active"
            activityText="Spend most of the day doing heavy physical activity"
            selected={selectedActivity === "Very Active"}
            onSelect={() => handleSelectActivity("Very Active")}
          />
        </div>
        <div className="m-2 self-end">
          <Button
            className="bg-[#557C55] hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className="bg-secondary hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLevelModal;

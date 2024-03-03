import React, { useState } from "react";
import GoalCard from "./GoalCard";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

const GoalTypeModal = () => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const navigate = useNavigate();
  const handleSelectedGoal = (goalType) => {
    setSelectedGoal(goalType);
  };
  const handleBack = () => {
    navigate("/auth/sign-in");
  };
  const handleNext = () => {
    if (!selectedGoal) {
      toast.error("Please select a goal type");
      return;
    }
    const selectedGoalConverted =
      selectedGoal === "Lose Weight"
        ? 1
        : selectedGoal === "Maintain Weight"
        ? 2
        : 3;
    navigate("/auth/set-weekly-goal", {
      state: { selectedGoal: selectedGoalConverted },
    });
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[27rem] bg-surface-dark shadow-lg p-4 rounded">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
        <div className="relative h-6 flex items-center justify-center">
          <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[20%] bg-surface-mid "></div>
          <div className="relative text-black-700 font-medium text-sm">20%</div>
        </div>
      </div>
      <Typography
        variant="h4"
        className="text-white p-2 text-center cursor-pointer select-none"
      >
        What is your goal type?
      </Typography>
      <div className="flex flex-col justify-between h-full">
        <div className="m-2 flex flex-col gap-2">
          <GoalCard
            goalType="Lose Weight"
            selected={selectedGoal === "Lose Weight"}
            onSelect={() => handleSelectedGoal("Lose Weight")}
          />
          <GoalCard
            goalType="Maintain Weight"
            selected={selectedGoal === "Maintain Weight"}
            onSelect={() => handleSelectedGoal("Maintain Weight")}
          />
          <GoalCard
            goalType="Gain Weight"
            selected={selectedGoal === "Gain Weight"}
            onSelect={() => handleSelectedGoal("Gain Weight")}
          />
        </div>
        <div className="m-2 self-end">
          <Button
            className="bg-[#557C55] hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3 transition ease-out duration-500"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className="bg-secondary hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3 transition ease-out duration-500"
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GoalTypeModal;

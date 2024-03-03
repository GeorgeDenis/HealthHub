import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import { toast } from "react-toastify";

const WeeklyGoalModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedGoal } = location.state || {};
  const [selectedWeeklyGoal, setSelectedWeeklyGoal] = useState(null);
  const handleWeeklyGoalChange = (value) => {
    setSelectedWeeklyGoal(value);
  };
  const handleBack = () => {
    navigate("/auth/set-goal-type");
  };
  const handleNext = () => {
    if (!selectedWeeklyGoal) {
      toast.error("Please select a weekly goal");
      return;
    }
    if (selectedGoal === 1 && parseFloat(selectedWeeklyGoal) > 0) {
      toast.error("Invalid weekly goal for weight loss");
      return;
    }
    if (selectedGoal === 2 && parseFloat(selectedWeeklyGoal) !== 1) {
      toast.error("Invalid weekly goal for weight maintenance");
      return;
    }
    if (selectedGoal === 3 && parseFloat(selectedWeeklyGoal) < 0) {
      toast.error("Invalid weekly goal for weight gain");
      return;
    }
    let weeklyGoal = Math.abs(parseFloat(selectedWeeklyGoal));
    navigate("/auth/set-activity-level", {
      state: { selectedGoal, selectedWeeklyGoal: weeklyGoal },
    });
  };
  useEffect(() => {
    if (!selectedGoal) {
      navigate("/auth/set-goal-type");
    }
  }, []);
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[27rem] bg-surface-dark shadow-lg p-4 rounded flex flex-col">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
        <div className="relative h-6 flex items-center justify-center">
          <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[40%] bg-surface-mid "></div>
          <div className="relative text-black-700 font-medium text-sm">
            40%
          </div>
        </div>
      </div>
      <Typography variant="h4" className="text-white p-2 select-none">
        Edit Weekly Goal
      </Typography>
      <div className="flex flex-col justify-between h-full">
        <div className="m-2">
          <Select
            value={selectedWeeklyGoal}
            onChange={handleWeeklyGoalChange}
            className="!border-surface-light text-surface-light focus:!border-secondary select-none"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            placeholder="Select Weekly Goal"
          >
            <Option value="-0.25" className="text-surface-mid-light">
              Lose 0.25 kg per week
            </Option>
            <Option value="-0.5" className="text-surface-mid-light">
              Lose 0.5 kg per week
            </Option>
            <Option value="-0.75" className="text-surface-mid-light">
              Lose 0.75 kg per week
            </Option>
            <Option value="-1" className="text-surface-mid-light">
              Lose 1 kg per week
            </Option>
            <Option value="1" className="text-surface-mid-light">
              Maintain my current weight
            </Option>
            <Option value="0.25" className="text-surface-mid-light">
              Gain 0.25 kg per week
            </Option>
            <Option value="0.5" className="text-surface-mid-light">
              Gain 0.5 kg per week
            </Option>
          </Select>
        </div>
      </div>
      <div className="m-2 flex items-center self-end">
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
  );
};

export default WeeklyGoalModal;

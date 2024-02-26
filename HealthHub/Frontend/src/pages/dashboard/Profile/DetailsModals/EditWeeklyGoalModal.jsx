import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import api from "../../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";

const EditWeeklyGoalModal = ({
  open,
  onClose,
  onWeeklyGoalUpdate,
  goalType,
}) => {
  const [selectedWeeklyGoal, setSelectedWeeklyGoal] = useState("");
  const currentUser = useUser();
  const handleWeeklyGoalChange = (value) => {
    setSelectedWeeklyGoal(value);
  };
  const handleSave = async () => {
    if(goalType === 1 && parseFloat(selectedWeeklyGoal) > 0){
      toast.error("Invalid weekly goal for weight loss");
      return;
    }
    if(goalType === 2 && parseFloat(selectedWeeklyGoal) !== 1){
      toast.error("Invalid weekly goal for weight maintenance");
      return;
    }
    if(goalType === 3 && parseFloat(selectedWeeklyGoal) < 0){
      toast.error("Invalid weekly goal for weight gain");
      return;
    }
    let weeklyGoal = Math.abs(parseFloat(selectedWeeklyGoal));
    console.log(weeklyGoal);
    try {
      const response = await api.put(
        `/api/v1/Users/${currentUser.userId}`,
        {
          id: currentUser.userId,
          weeklyGoal: weeklyGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        onWeeklyGoalUpdate();
        toast.success("User activity level updated successfully");
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user activity level");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25rem] bg-surface-darkest shadow-lg p-4 rounded">
        <Typography variant="h4" className="text-white p-2">
          Edit Weekly Goal
        </Typography>
        <div className="flex flex-col justify-between h-full">
          <div className="m-2">
              <Select
                value={selectedWeeklyGoal}
                onChange={handleWeeklyGoalChange}
                className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
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
            {/* {goalType === 2 && (
              <Select
                value={selectedWeeklyGoal}
                onChange={handleWeeklyGoalChange}
                className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                placeholder="Select Weekly Goal"
              >
                <Option value="1" className="text-surface-mid-light">
                  Maintain my current weight
                </Option>
              </Select>
            )}
            {goalType === 3 && (
              <Select
                value={selectedWeeklyGoal}
                onChange={handleWeeklyGoalChange}
                className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                placeholder="Select Weekly Goal"
              >
                <Option value="0.25" className="text-surface-mid-light">
                  Gain 0.25 kg per week
                </Option>
                <Option value="0.5" className="text-surface-mid-light">
                  Gain 0.5 kg per week
                </Option>
              </Select>
            )} */}
          </div>
          <div className="m-2 self-end">
            <Button
              size="sm"
              className="bg-secondary hover:bg-primary"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditWeeklyGoalModal;

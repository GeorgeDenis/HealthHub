import React, { useState } from "react";
import { Modal } from "@mui/material";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import api from "../../../../services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";

const EditActivityLevelModal = ({ open, onClose, onActivityLevelUpdate }) => {
  const [selectedActivityLevel , setSelectedActivityLevel ] = useState("");
  const currentUser = useUser();
  const handleActivityLevelChange = (value) => {
    setSelectedActivityLevel(value);
  };
  const handleSave = async () => {
    try {
      const response = await api.put(
        `/api/v1/Users/${currentUser.userId}`,
        {
          id: currentUser.userId,
          activity: parseInt(selectedActivityLevel, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        onActivityLevelUpdate();
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
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[25rem] bg-surface-darkest shadow-lg p-4 rounded">
        <Typography variant="h4" className="text-white p-2">
          Edit Activity Level
        </Typography>
        <div className="flex flex-col justify-between h-full">
          <div className="m-2">
            <Select
              value={selectedActivityLevel}
              onChange={(value) => handleActivityLevelChange(value)}
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              placeholder="Select Activity"
            >
              <Option value="1" className="text-surface-mid-light">
                Sedentary: Spend most of the day sitting
              </Option>
              <Option value="2" className="text-surface-mid-light">
                Lightly Active: Spend a good part of the day on your feet
              </Option>
              <Option value="3" className="text-surface-mid-light">
                Active: Spend a good part of the day doing some physical
                activity
              </Option>
              <Option value="4" className="text-surface-mid-light">
                Very Active: Spend most of the day doing heavy physical activity
              </Option>
            </Select>
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

export default EditActivityLevelModal;

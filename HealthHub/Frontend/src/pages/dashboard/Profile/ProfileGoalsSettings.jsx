import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import api from "@/services/api";
import { toast } from "react-toastify";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useUser } from "@/context/LoginRequired";
const ProfileGoalsSettings = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUserMacronutrients, setCurrentUserMacronutrients] = useState(
    {},
  );
  const [age, setAge] = useState(userData.age);
  const currentUser = useUser();

  useEffect(() => {
    if (open) {
      fetchCurrentUser();
      fetchCurrentUserMacronutrients();
    }
  }, [open]);
  const fetchCurrentUser = async () => {
    try {
      const response = await api.get(`/api/v1/Users/${currentUser.userId}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (response.status === 200) {
        setUserData({
          age: response.data.user?.age,
          height: response.data.user?.height,
          gender: response.data.user?.gender,
          weeklyGoal: response.data.user?.weeklyGoal,
          goalWeight: response.data.user?.goalWeight,
          goalType: response.data.user?.goalType,
          activity: response.data.user?.activity,
        });
      } else {
        toast.error("Failed to fetch user data");
      }
    } catch (error) {
      toast.error("Error fetching user data:", error);
    }
  };
  const fetchCurrentUserMacronutrients = async () => {
    try {
      const response = await api.get(`/api/v1/Macronutrients`, {
        params: {
          userId: currentUser.userId,
        },
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });
      if (response.status === 200) {
        setCurrentUserMacronutrients({
          protein: response.data.macronutrientsGoalDto?.protein,
          carbohydrates: response.data.macronutrientsGoalDto?.carbohydrates,
          fats: response.data.macronutrientsGoalDto?.fats,
        });
      } else {
        toast.error("Failed to fetch user macronutrients");
      }
    } catch (error) {
      toast.error("Error fetching user macronutrients:", error);
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        className="w-full bg-surface-dark hover:bg-primary flex flex-row items-center"
        onClick={handleOpen}
        size="sm"
      >
        <p className="text-center text-xs">Goals</p>
        <FitnessCenterIcon
          fontSize="extraSmall"
          className="text-center text-surface-light shadow-lg ml-1"
        ></FitnessCenterIcon>
      </Button>
      <Modal open={open} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[30rem] w-[90vw] bg-surface-darkest shadow-lg p-4 rounded">
          <Typography variant="h4" className="text-white p-2">
            Goals Settings
          </Typography>
          <div className="flex flex-col justify-between h-full gap-2">
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Age"}
              color={"green"}
              className={"text-surface-light"}
              crossOrigin={undefined}
              value={userData.age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />

            <Select
              placeholder="Select Gender"
              className="text-surface-light focus:!border-secondary"
              value={userData.gender === 1 ? "Male" : "Female"}
            >
              <Option value={"1"} className="text-surface-mid-light">
                Male
              </Option>
              <Option value={"2"} className="text-surface-mid-light">
                Female
              </Option>
            </Select>
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Height"}
              color={"green"}
              className={"text-surface-light"}
              value={userData.height}
              crossOrigin={undefined}
            />
            <Select
              variant={"outlined"}
              label={"Activity Level"}
              color={"green"}
              className="text-surface-light"
              value={
                userData.activity === 1
                  ? "Sedentary"
                  : userData.activity === 2
                  ? "Lightly Active"
                  : userData.activity === 3
                  ? "Active"
                  : "Very Active"
              }
            >
              <Option value={"1"} className="text-surface-mid-light">
              Sedentary
              </Option>
              <Option value={"2"} className="text-surface-mid-light">
              Lightly Active
              </Option>
              <Option value={"3"} className="text-surface-mid-light">
              Active
              </Option>
              <Option value={"4"} className="text-surface-mid-light">
              Very Active
              </Option>
            </Select>
            <Select
              variant={"outlined"}
              label={"Weekly Goal"}
              color={"green"}
              className="text-surface-light"
              value={
                userData.weeklyGoal
              }
            >
              <Option value={"1"} className="text-surface-mid-light">
              Sedentary
              </Option>
              <Option value={"2"} className="text-surface-mid-light">
              Lightly Active
              </Option>
              <Option value={"3"} className="text-surface-mid-light">
              Active
              </Option>
              <Option value={"4"} className="text-surface-mid-light">
              Very Active
              </Option>
            </Select>
            <Select
              variant={"outlined"}
              label={"Goal Type"}
              color={"green"}
              className="text-surface-light"
              value={
                userData.goalType === 1
                  ? "Lose Weight"
                  : userData.activity === 2
                  ? "Maintain Weight"
                  : "Gain Weight"
              }
            >
              <Option value={"1"} className="text-surface-mid-light">
                Lose Weight
              </Option>
              <Option value={"2"} className="text-surface-mid-light">
                Maintain Weight
              </Option>
              <Option value={"3"} className="text-surface-mid-light">
                Gain Weight
              </Option>
            </Select>
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Goal Weight"}
              color={"green"}
              className={"text-surface-light"}
              crossOrigin={undefined}
              value={userData.goalWeight}
            />
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Protein"}
              color={"green"}
              className={"text-surface-light"}
              crossOrigin={undefined}
              value={currentUserMacronutrients.protein}
            />
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Carbohydrates"}
              color={"green"}
              className={"text-surface-light"}
              crossOrigin={undefined}
              value={currentUserMacronutrients.carbohydrates}
            />
            <Input
              type={"text"}
              variant={"outlined"}
              label={"Fats"}
              color={"green"}
              className={"text-surface-light"}
              crossOrigin={undefined}
              value={currentUserMacronutrients.fats}
            />

            <div className="m-2 self-end">
              <Button size="sm" className="bg-secondary hover:bg-primary">
                Save
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileGoalsSettings;

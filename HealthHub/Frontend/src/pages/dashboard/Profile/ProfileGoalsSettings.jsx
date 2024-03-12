import React, { useState, useEffect } from "react";

import { Modal } from "@mui/material";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/services/api";
import { toast } from "react-toastify";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useUser } from "@/context/LoginRequired";
import EditGenderModal from "./DetailsModals/EditGenderModal";
import EditActivityLevelModal from "./DetailsModals/EditActivityLevelModal";
import EditGoalTypeModal from "./DetailsModals/EditGoalTypeModal";
import EditWeeklyGoalModal from "./DetailsModals/EditWeeklyGoalModal";
const ProfileGoalsSettings = () => {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUserMacronutrients, setCurrentUserMacronutrients] = useState(
    {},
  );
  const [isEditGenderModalOpen, setIsEditGenderModalOpen] = useState(false);
  const [isEditActivityLevelModalOpen, setIsEditActivityLevelModalOpen] =
    useState(false);
  const [isEditGoalTypeModalOpen, setIsEditGoalTypeModalOpen] = useState(false);
  const [isEditWeeklyGoalTypeModalOpen, setIsEditWeeklyGoalTypeModalOpen] =
    useState(false);

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
          dateOfBirth: response.data.user?.dateOfBirth,
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

  const handleDataChange = (value, type) => {
    setUserData((prevUserData) => ({ ...prevUserData, [type]: value }));
  };

  const handleMicronutrientsChange = (value, type) => {
    setCurrentUserMacronutrients((prevMacroData) => ({
      ...prevMacroData,
      [type]: value,
    }));
  };
  const handleDietSave = async () => {
    try {
      const response = await api.put(
        `/api/v1/Users/${currentUser.userId}`,
        {
          id: currentUser.userId,
          dateOfBirth: userData.dateOfBirth,
          height: userData.height,
          goalWeight: userData.goalWeight,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("User diet profile updated successfully");
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user diet profile");
    }
  };
  const handleMacroSave = async () => {
    try {
      const response = await api.put(
        `/api/v1/Macronutrients/${currentUser.userId}`,
        {
          userId: currentUser.userId,
          protein: currentUserMacronutrients.protein,
          carbohydrates: currentUserMacronutrients.carbohydrates,
          fat: currentUserMacronutrients.fats,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("User macros percents updated successfully");
        handleClose();
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(
          "Failed to update user macros percents" + error.response.data.message,
        );
      } else {
        toast.error("Failed to update user macros percents");
      }
    }
  };
  const handleOpenEditGenderModal = () => {
    setIsEditGenderModalOpen(true);
  };
  const handleCloseEditGenderModal = () => {
    setIsEditGenderModalOpen(false);
  };
  const handleOpenEditActivityLevelModal = () => {
    setIsEditActivityLevelModalOpen(true);
  };
  const handleCloseEditActivityLevelModal = () => {
    setIsEditActivityLevelModalOpen(false);
  };
  const handleOpenEditGoalTypeModal = () => {
    setIsEditGoalTypeModalOpen(true);
  };
  const handleCloseEditGoalTypeModal = () => {
    setIsEditGoalTypeModalOpen(false);
  };
  const handleOpenEditWeeklyGoalTypeModal = () => {
    setIsEditWeeklyGoalTypeModalOpen(true);
  };
  const handleCloseEditWeeklyGoalTypeModal = () => {
    setIsEditWeeklyGoalTypeModalOpen(false);
  };
  const handleDetailsUpdate = async () => {
    fetchCurrentUser();
  };
  return (
    <div>
      <Button
        className="w-full bg-surface-dark hover:bg-primary flex flex-row items-center"
        onClick={handleOpen}
        size="sm"
      >
        <p className="text-center text-xs">Update Diet</p>
        <FitnessCenterIcon
          fontSize="extraSmall"
          className="text-center text-surface-light shadow-lg ml-1"
        ></FitnessCenterIcon>
      </Button>
      <Modal open={open} onClose={handleClose}>
        {userData && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-4 rounded">
            <div className="flex flex-col justify-between h-full gap-2">
              <Typography variant="h4" className="text-white p-2">
                Update Your Diet Profile
              </Typography>
              <div className="flex justify-between items-center">
                <p className="text-surface-light">Date of birth:</p>
                <DatePicker
                  placeholderText="Select Date of Birth"
                  onChange={(date) =>
                    handleDataChange(date.toISOString(), "dateOfBirth")
                  }
                  wrapperClassName="bg-surface-darkest rounded border"
                  className="w-full bg-surface-dark border border-surface-light-dark rounded p-2 focus:outline-none focus:border-secondary text-surface-light"
                  selected={userData.dateOfBirth || ""}
                />
              </div>

              <Input
                type={"text"}
                variant={"outlined"}
                label={"Height"}
                color={"green"}
                className={"text-surface-light"}
                value={userData.height || ""}
                crossOrigin={undefined}
                onChange={(e) => handleDataChange(e.target.value, "height")}
              />
              <Input
                type={"text"}
                variant={"outlined"}
                label={"Goal Weight"}
                color={"green"}
                className={"text-surface-light"}
                crossOrigin={undefined}
                value={userData.goalWeight || ""}
                onChange={(e) => handleDataChange(e.target.value, "goalWeight")}
              />
              <div className="m-2 self-end">
                <Button
                  size="sm"
                  className="bg-secondary hover:bg-primary"
                  onClick={handleDietSave}
                >
                  Save
                </Button>
              </div>
              <div className="flex flex-col gap-1 w-[16rem]">
                {userData.gender && (
                  <div className="flex text-surface-light justify-between">
                    <p>Gender:</p>
                    <Button
                      size="md"
                      onClick={handleOpenEditGenderModal}
                      className="w-[8rem] text-xs text-center rounded-md text-surface-light bg-secondary p-1 ml-2"
                    >
                      {userData.gender === 1 ? "Male" : "Female"}
                    </Button>
                  </div>
                )}
                {userData.activity && (
                  <div className="flex text-surface-light justify-between">
                    <p>Activity Level:</p>
                    <Button
                      size="md"
                      onClick={handleOpenEditActivityLevelModal}
                      className="w-[8rem] text-xs text-center rounded-md text-surface-light bg-secondary p-1 ml-2"
                    >
                      {userData.activity === 1
                        ? "Sedentary"
                        : userData.activity === 2
                        ? "Lightly Active"
                        : userData.activity === 3
                        ? "Active"
                        : "Very Active"}
                    </Button>
                  </div>
                )}
                {userData.goalType && (
                  <div className="flex text-surface-light justify-between">
                    <p>Goal Type:</p>
                    <Button
                      size="md"
                      onClick={handleOpenEditGoalTypeModal}
                      className="w-[8rem] text-xs text-center rounded-md text-surface-light bg-secondary p-1 ml-2"
                    >
                      {userData.goalType === 1
                        ? "Lose Weight"
                        : userData.goalType === 2
                        ? "Maintain Weight"
                        : "Gain Weight"}
                    </Button>
                  </div>
                )}
                {userData.weeklyGoal && (
                  <div className="flex text-surface-light justify-between">
                    <p>Weekly Goal:</p>
                    <Button
                      size="md"
                      onClick={handleOpenEditWeeklyGoalTypeModal}
                      className="w-[8rem] text-xs text-center rounded-md text-surface-light bg-secondary p-1 ml-2"
                    >
                      {userData.weeklyGoal}
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-between h-full gap-2">
              <Typography variant="h4" className="text-white p-2">
                Daily Nutrition Goals
              </Typography>
              <Input
                type={"text"}
                variant={"outlined"}
                label={"Protein"}
                color={"green"}
                className={"text-surface-light"}
                crossOrigin={undefined}
                value={currentUserMacronutrients.protein || ""}
                onChange={(e) =>
                  handleMicronutrientsChange(e.target.value, "protein")
                }
              />
              <Input
                type={"text"}
                variant={"outlined"}
                label={"Carbohydrates"}
                color={"green"}
                className={"text-surface-light"}
                crossOrigin={undefined}
                value={currentUserMacronutrients.carbohydrates || ""}
                onChange={(e) =>
                  handleMicronutrientsChange(e.target.value, "carbohydrates")
                }
              />
              <Input
                type={"text"}
                variant={"outlined"}
                label={"Fats"}
                color={"green"}
                className={"text-surface-light"}
                crossOrigin={undefined}
                value={currentUserMacronutrients.fats || ""}
                onChange={(e) =>
                  handleMicronutrientsChange(e.target.value, "fats")
                }
              />

              <div className="m-2 self-end">
                <Button
                  size="sm"
                  className="bg-secondary hover:bg-primary"
                  onClick={handleMacroSave}
                >
                  Save
                </Button>
              </div>
              <EditGenderModal
                open={isEditGenderModalOpen}
                onClose={handleCloseEditGenderModal}
                onGenderUpdate={handleDetailsUpdate}
              />
              <EditActivityLevelModal
                open={isEditActivityLevelModalOpen}
                onClose={handleCloseEditActivityLevelModal}
                onActivityLevelUpdate={handleDetailsUpdate}
              />
              <EditGoalTypeModal
                open={isEditGoalTypeModalOpen}
                onClose={handleCloseEditGoalTypeModal}
                onGoalTypeUpdate={handleDetailsUpdate}
              />
              <EditWeeklyGoalModal
                open={isEditWeeklyGoalTypeModalOpen}
                onClose={handleCloseEditWeeklyGoalTypeModal}
                onWeeklyGoalUpdate={handleDetailsUpdate}
                goalType={userData.goalType}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfileGoalsSettings;

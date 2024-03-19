import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import { Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import LensIcon from "@mui/icons-material/Lens";
import AddStrengthExerciseModal from "./AddStrengthExerciseModal";
import AddCardioExerciseModal from "./AddCardioExerciseModal";
const ExerciseModal = ({ isExerciseModalOpen, handleCloseExerciseModal }) => {
  const [exerciseType, setExerciseType] = useState("");

  const [isStrengthExerciseModalOpen, setIsStrengthExerciseModalOpen] =
    useState(false);
  const [isCardioExerciseModalOpen, setIsCardioExerciseModalOpen] =
    useState(false);

  useEffect(() => {
    setExerciseType("");
  }, [isExerciseModalOpen]);

  const handleExerciseTypeChange = (type) => {
    setExerciseType(type);
  };

  const handleNextButton = () => {
    if (exerciseType === "") {
      toast.error("Please select an exercise type");
      return;
    }
    if (exerciseType === "strength") {
      handleOpenStrengthExerciseModal();
    }
    if (exerciseType === "cardio") {
      handleOpenCardioExerciseModal();
    }
  };
  const handleOpenStrengthExerciseModal = () => {
    setIsStrengthExerciseModalOpen(true);
  };
  const handleCloseStrengthExerciseModal = () => {
    setIsStrengthExerciseModalOpen(false);
    handleCloseExerciseModal();
  };
  const handleOpenCardioExerciseModal = () => {
    setIsCardioExerciseModalOpen(true);
  };
  const handleCloseCardioExerciseModal = () => {
    setIsCardioExerciseModalOpen(false);
    handleCloseExerciseModal();
  };

  return (
    <>
      <Modal open={isExerciseModalOpen} onClose={handleCloseExerciseModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[70vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="flex flex-col gap-3">
            <Typography color="green">Add Exercise</Typography>
            <div
              className="p-2 bg-green-700 rounded-lg flex items-center gap-1 h-8 cursor-pointer"
              onClick={() => handleExerciseTypeChange("cardio")}
            >
              {exerciseType === "cardio" ? (
                <LensIcon className="text-surface-light" />
              ) : (
                <RadioButtonUncheckedIcon className="text-surface-light" />
              )}
              <p className="text-surface-light">Cardio exercises</p>
            </div>
            <div
              className="p-2 bg-green-700 rounded-lg flex items-center gap-1 h-8 cursor-pointer"
              onClick={() => handleExerciseTypeChange("strength")}
            >
              {exerciseType === "strength" ? (
                <LensIcon className="text-surface-light" />
              ) : (
                <RadioButtonUncheckedIcon className="text-surface-light" />
              )}
              <p className="text-surface-light">Strength exercises</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-5 w-14 h-8 bg-secondary hover:bg-primary duration-200 flex justify-center items-center"
              size="sm"
              onClick={() => handleNextButton()}
            >
              Next
            </Button>
          </div>
        </div>
      </Modal>
      <AddStrengthExerciseModal
        isStrengthExerciseModalOpen={isStrengthExerciseModalOpen}
        handleCloseStrengthExerciseModal={handleCloseStrengthExerciseModal}
      />
      <AddCardioExerciseModal
        isCardioExerciseModalOpen={isCardioExerciseModalOpen}
        handleCloseCardioExerciseModal={handleCloseCardioExerciseModal}
      />
    </>
  );
};

export default ExerciseModal;

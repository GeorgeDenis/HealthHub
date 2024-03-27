import React, { useState, useEffect } from "react";
import { useUser } from "@/context/LoginRequired";
import { CardContent, Modal } from "@mui/material";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import AddTaskIcon from "@mui/icons-material/AddTask";
const NewStrengthExerciseModal = ({
  isNewStrengthExerciseModalOpen,
  handleCloseNewStrengthExerciseModal,
  exerciseName,
  muscle,
  selectedDate,
}) => {
  const currentUser = useUser();
  const [exercise, setExercise] = useState({
    exerciseName: "",
    muscleGroup: "",
    numberOfSets: "",
    weightPerSet: "",
  });
  const handleNutrientChange = (e, type) => {
    const value = e.target.value;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [type]: value,
    }));
  };
  useEffect(() => {
    setExercise({
      exerciseName: exerciseName || "",
      muscleGroup: muscle || "",
      numberOfSets: "",
      weightPerSet: "",
    });
  }, [isNewStrengthExerciseModalOpen, exerciseName, muscle]);

  const handleAddExercise = async () => {
    if (
      !exercise.exerciseName ||
      !exercise.muscleGroup ||
      !exercise.numberOfSets ||
      !exercise.weightPerSet
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if(exercise.numberOfSets <= 0){
      toast.error("Number of sets must be greater than 0");
      return;
    }
    try {
      const response = await api.post(
        `/api/v1/LoggedStrengthExercise`,
        {
          userId: currentUser.userId,
          name: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,
          numberOfSets: exercise.numberOfSets,
          weightPerSet: exercise.weightPerSet,
          dateLogged: selectedDate,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Exercise added successfully");
        handleCloseNewStrengthExerciseModal();
      }
    } catch (error) {
      toast.error("Error adding exercise");
    }
  };
  return (
    <>
      <Modal
        open={isNewStrengthExerciseModalOpen}
        onClose={handleCloseNewStrengthExerciseModal}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[29rem] md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="mt-6 flex flex-col gap-3 items-center">
            <div className="rounded-lg p-2 bg-green-800">
              <Typography className="text-md font-semibold" color="white">
                New Exercise
              </Typography>
            </div>

            <input
              type="text"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Exercise Name"
              value={exercise.exerciseName}
              onChange={(e) => handleNutrientChange(e, "exerciseName")}
            />
            <input
              type="text"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Muscle Group"
              value={exercise.muscleGroup}
              onChange={(e) => handleNutrientChange(e, "muscleGroup")}
            />
            <input
              type="number"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Number of sets"
              value={exercise.numberOfSets}
              onChange={(e) => handleNutrientChange(e, "numberOfSets")}
            />
            <input
              type="text"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Weight per set ex: 4,5,6 kg"
              value={exercise.weightPerSet}
              onChange={(e) => handleNutrientChange(e, "weightPerSet")}
            />
            <button
              className=" flex justify-center items-center gap-2 mt-5 mx-auto w-20 h-8 bg-secondary hover:bg-primary duration-200 rounded-lg p-2 text-surface-light"
              onClick={() => handleAddExercise()}
            >
              <AddTaskIcon className="text-surface-light" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default NewStrengthExerciseModal;

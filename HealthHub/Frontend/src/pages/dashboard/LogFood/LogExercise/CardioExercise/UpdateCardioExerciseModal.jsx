import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { useUser } from "@/context/LoginRequired";
import { Typography } from "@material-tailwind/react";
import AddTaskIcon from "@mui/icons-material/AddTask";

const UpdateCardioExerciseModal = ({
  updateCardioExerciseOpen,
  handleCloseUpdateCardioExercise,
  cardioExerciseToEdit,
  refetchLoggedCardioExercises,
}) => {
  const currentUser = useUser();
  const [exercise, setExercise] = useState({
    id: "",
    exerciseName: "",
    caloriesBurned: "",
    duration: "",
  });

  useEffect(() => {
    setExercise({
      id: cardioExerciseToEdit.id,
      exerciseName: cardioExerciseToEdit.exerciseName || "",
      caloriesBurned: cardioExerciseToEdit.caloriesBurned || 0,
      duration: cardioExerciseToEdit.duration || 0,
    });
  }, [updateCardioExerciseOpen, cardioExerciseToEdit]);

  const handleCardioChange = (e, type) => {
    const value = e.target.value;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [type]: value,
    }));
  };
  const handleUpdateCardioExercise = async () => {
    console.log(exercise);
    if (
      !exercise.id ||
      !exercise.exerciseName ||
      !exercise.caloriesBurned ||
      !exercise.duration
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if(exercise.duration <= 0){
      toast.error("Duration must be greater than 0");
      return;
    }
    if(exercise.caloriesBurned <= 0){
      toast.error("Calories burned must be greater than 0");
      return;
    }
    try {
      const response = await api.put(
        `/api/v1/LoggedCardioExercise`,
        {
          loggedCardioExerciseId: exercise.id,
          userId: currentUser.userId,
          name: exercise.exerciseName,
          caloriesBurned: exercise.caloriesBurned,
          duration: exercise.duration,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Exercise updated successfully");
        refetchLoggedCardioExercises();
        handleCloseUpdateCardioExercise();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while updating the exercise");
    }
  };
  return (
    <>
      <Modal
        open={updateCardioExerciseOpen}
        onClose={handleCloseUpdateCardioExercise}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="mt-6 flex flex-col gap-3 items-center">
            <div className="rounded-lg p-2 bg-green-800">
              <Typography className="text-md font-semibold" color="white">
                Edit Exercise
              </Typography>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-surface-light">Exercise Name:</p>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
                placeholder="Exercise Name"
                value={exercise.exerciseName}
                onChange={(e) => handleCardioChange(e, "exerciseName")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-surface-light">Duration (in minutes):</p>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
                placeholder="Duration (in minutes)"
                value={exercise.duration}
                onChange={(e) => handleCardioChange(e, "duration")}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-surface-light">Calories per hour:</p>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
                placeholder="Calories per hour"
                value={exercise.caloriesBurned}
                onChange={(e) => handleCardioChange(e, "caloriesBurned")}
              />
            </div>
            <button
              className=" flex justify-center items-center gap-2 mt-5 mx-auto w-20 h-8 bg-secondary hover:bg-primary duration-200 rounded-lg p-2 text-surface-light"
              onClick={() => handleUpdateCardioExercise()}
            >
              <AddTaskIcon className="text-surface-light" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UpdateCardioExerciseModal;

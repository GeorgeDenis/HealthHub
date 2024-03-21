import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExerciseModal from "./LogExercise/ExerciseModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const LogExercise = ({
  cardioExercises,
  strengthExercises,
  fetchLoggedCardioExercises,
  fetchLoggedStrengthExercises,
}) => {
  const currentUser = useUser();
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const handleOpenExerciseModal = () => {
    setIsExerciseModalOpen(true);
  };
  const handleCloseExerciseModal = () => {
    setIsExerciseModalOpen(false);
  };

  const handleDeleteStrengthExercise = async (exerciseId) => {
    try {
      const response = await api.delete(
        `/api/v1/LoggedStrengthExercise/${exerciseId}`,
        {
          params: { id: exerciseId, userId: currentUser?.userId },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Exercise deleted successfully");
        fetchLoggedStrengthExercises();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the exercise");
    }
  };
  const handleDeleteCardioExercise = async (exerciseId) => {
    try {
      const response = await api.delete(
        `/api/v1/LoggedCardioExercise/${exerciseId}`,
        {
          params: { id: exerciseId, userId: currentUser?.userId },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Exercise deleted successfully");
        fetchLoggedCardioExercises();
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the exercise");
    }
  };
  return (
    <div className="flex flex-col mt-2 px-1 mb-10 md:mb-2 lg:w-[26rem] lg:h-[23rem] xl:w-[90%]">
      <div className="flex items-center mb-2">
        {/* <FitnessCenterIcon
          className="text-secondary"
          fontSize="extraSmall"
        ></FitnessCenterIcon> */}
        <p className="text-xl">{"🏋️‍♂️"}</p>
        <p className="text-gray-300 ml-1 text-md font-semibold">Exercises</p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex flex-col gap-2">
          {cardioExercises.map((exercise, index) => (
            <CardContent key={index} className="p-1 bg-green-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="text-surface-light text-xs md:text-sm font-semibold">
                    {exercise.exerciseName}
                  </p>
                  <EditIcon
                      className="cursor-pointer hover:text-green-400"
                      fontSize="small"
                    />
                </div>

                <div className="flex gap-1 md:gap-2">
                  <div>
                    <p className="text-surface-light text-xs">
                      Duration in minutes: {exercise.duration}
                    </p>
                    <p className="text-surface-light text-xs">
                      Calories burned: {exercise.caloriesBurned}
                    </p>
                  </div>
                  <DeleteIcon
                    className="cursor-pointer hover:text-red-500"
                    fontSize="small"
                    onClick={() => handleDeleteCardioExercise(exercise.id)}
                  />
                </div>
              </div>
            </CardContent>
          ))}
          {strengthExercises.map((exercise, index) => (
            <CardContent key={index} className="p-1 bg-green-900 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-surface-light text-xs md:text-sm font-semibold">
                      {exercise.exerciseName}
                    </p>
                    <EditIcon
                      className="cursor-pointer hover:text-green-400"
                      fontSize="small"
                    />
                  </div>

                  <p className="text-surface-light text-xs  mt-1">
                    Muscle group: {exercise.muscleGroup}
                  </p>
                </div>
                <div className="flex gap-1 md:gap-2">
                  <div>
                    <p className="text-surface-light text-xs">
                      Number of sets: {exercise.sets}
                    </p>
                    <p className="text-surface-light text-xs">
                      Weight per set: {exercise.weightPerSet}
                    </p>
                  </div>
                  <DeleteIcon
                    className="cursor-pointer hover:text-red-500"
                    fontSize="small"
                    onClick={() => handleDeleteStrengthExercise(exercise.id)}
                  />
                </div>
              </div>
            </CardContent>
          ))}
          {cardioExercises.length === 0 && strengthExercises.length === 0 && (
            <CardContent className="p-2 bg-green-900 rounded-lg w-full flex justify-start items-center">
              <p className="text-gray-500 text-sm">
                No exercises logged. Tap the '+' to add your workout details!
              </p>
            </CardContent>
          )}
        </div>
      </div>
      <Button
        className="mt-5 w-14 h-8 bg-secondary hover:bg-primary duration-200 flex justify-center items-center"
        size="sm"
        onClick={() => handleOpenExerciseModal()}
      >
        <AddCircleIcon className="text-surface-light w-6 h-6" />
      </Button>
      <ExerciseModal
        isExerciseModalOpen={isExerciseModalOpen}
        handleCloseExerciseModal={handleCloseExerciseModal}
        fetchLoggedCardioExercises={fetchLoggedCardioExercises}
        fetchLoggedStrengthExercises={fetchLoggedStrengthExercises}
      />
    </div>
  );
};

export default LogExercise;

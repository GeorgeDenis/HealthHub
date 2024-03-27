import React, { useState, useEffect } from "react";
import { useUser } from "@/context/LoginRequired";
import { CardContent, Modal, duration } from "@mui/material";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import AddTaskIcon from "@mui/icons-material/AddTask";
const NewCardioExerciseModal = ({
  isNewCardioExerciseModalOpen,
  handleCloseNewCardioExerciseModal,
  exerciseName,
  calories_per_hour,
  selectedDate
}) => {
  const currentUser = useUser();
  const [areCaloriesPredefined, setAreCaloriesPredefined] = useState(false);
  const [initialCalories, setInitialCalories] = useState(0);
  const [exercise, setExercise] = useState({
    exerciseName: "",
    caloriesBurned: "",
    duration: "",
  });
  const handleCardioChange = (e, type) => {
    const value = e.target.value;
    if (areCaloriesPredefined && type === "duration") {
      let caloriesByDuration = 0;
      if (value > 0) {
        caloriesByDuration = parseInt((initialCalories * value) / 60);
      }
      setExercise((prevExercise) => ({
        ...prevExercise,
        [type]: value,
        caloriesBurned: caloriesByDuration,
      }));
      return;
    }
    setExercise((prevExercise) => ({
      ...prevExercise,
      [type]: value,
    }));
  };
  useEffect(() => {
    const durationPredefined = calories_per_hour ? 60 : "";
    if (calories_per_hour > 0) {
      setAreCaloriesPredefined(true);
      setInitialCalories(calories_per_hour);
    }
    setExercise({
      exerciseName: exerciseName || "",
      caloriesBurned: calories_per_hour || "",
      duration: durationPredefined,
    });
  }, [isNewCardioExerciseModalOpen, exerciseName, calories_per_hour]);

  const handleAddExercise = async () => {
    if (!exercise.exerciseName || !exercise.caloriesBurned) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const response = await api.post(
        `/api/v1/LoggedCardioExercise`,
        {
          userId: currentUser.userId,
          name: exercise.exerciseName,
          caloriesBurned: exercise.caloriesBurned,
          duration: exercise.duration,
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
        handleCloseNewCardioExerciseModal();
      }
    } catch (error) {
      toast.error("Error adding exercise");
    }
  };
  return (
    <>
      <Modal
        open={isNewCardioExerciseModalOpen}
        onClose={handleCloseNewCardioExerciseModal}
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
              onChange={(e) => handleCardioChange(e, "exerciseName")}
            />
            <input
              type="number"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Calories per hour"
              value={exercise.caloriesBurned}
              onChange={(e) => handleCardioChange(e, "caloriesBurned")}
              readOnly={areCaloriesPredefined}
            />
            <input
              type="number"
              className=" bg-surface-light rounded-lg w-[14rem]  border border-gray-300 p-2"
              placeholder="Duration (in minutes)"
              value={exercise.duration}
              onChange={(e) => handleCardioChange(e, "duration")}
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

export default NewCardioExerciseModal;

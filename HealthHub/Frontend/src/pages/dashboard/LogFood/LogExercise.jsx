import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const LogExercise = ({ cardioExercises, strengthExercises }) => {
  return (
    <div className="flex flex-col mt-4 px-1 mb-2 lg:w-[26rem] lg:h-[15rem] xl:w-[90%]">
      <div className="flex items-center mb-2">
        <FitnessCenterIcon
          className="text-secondary"
          fontSize="extraSmall"
        ></FitnessCenterIcon>
        <p className="text-gray-300 ml-1 text-md font-semibold">Exercises</p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col gap-2">
          {cardioExercises.map((exercise, index) => (
            <CardContent key={index} className="p-1 bg-green-900 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="text-surface-light text-sm font-semibold">
                  {exercise.exerciseName}
                </p>
                <div>
                  <p className="text-surface-light text-xs">
                    Duration in minutes: {exercise.duration}
                  </p>
                  <p className="text-surface-light text-xs">
                    Calories burned: {exercise.caloriesBurned}
                  </p>
                </div>
              </div>
            </CardContent>
          ))}
          {strengthExercises.length > 0 ? (
            strengthExercises.map((exercise, index) => (
              <CardContent key={index} className="p-1 bg-green-900 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-surface-light text-sm font-semibold">
                      {exercise.exerciseName}
                    </p>
                    <p className="text-surface-light text-xs">
                      Muscle group: {exercise.muscleGroup}
                    </p>
                  </div>
                  <div>
                    <p className="text-surface-light text-xs">
                      Number of sets: {exercise.sets}
                    </p>
                    <p className="text-surface-light text-xs">
                      Weight per set: {exercise.weightPerSet}
                    </p>
                  </div>
                </div>
              </CardContent>
            ))
          ) : (
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
      >
        <AddCircleIcon className="text-surface-light w-6 h-6" />
      </Button>
    </div>
  );
};

export default LogExercise;

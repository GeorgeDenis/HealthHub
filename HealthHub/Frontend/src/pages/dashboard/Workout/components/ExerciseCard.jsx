import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
  return (
    <Link className="" to={`/exercise/${exercise.id}`}>
      <div className="w-[300px] flex flex-col items-center justify-between cursor-pointer bg-[#0b6e4f] rounded-md p-3 gap-3">
        <img
          className="rounded-lg w-64 h-64"
          src={exercise.gifUrl}
          alt={exercise.name}
          loading="lazy"
        />
        <div className="w-full flex items-center justify-center gap-2">
          <button className="p-2 bg-green-800 rounded-full text-sm capitalize text-white">
            {exercise.bodyPart}
          </button>
          <button className="p-2 bg-green-600 rounded-full text-sm capitalize text-white">
            {exercise.target}
          </button>
        </div>
        <p className="text-white capitalize text-center mb-4">
          {exercise.name}
        </p>
      </div>
    </Link>
  );
};

export default ExerciseCard;

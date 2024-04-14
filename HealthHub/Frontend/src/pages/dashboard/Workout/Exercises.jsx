import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./components/ExerciseCard";
import { motion } from "framer-motion";

const Exercises = ({ exercises, setExercises }) => {
  return (

    <Box id="exercises" sx={{ mt: { lg: "50px" } }} mt="50px" p="20px">
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {exercises?.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </Stack>
    </Box>

  );
};

export default Exercises;

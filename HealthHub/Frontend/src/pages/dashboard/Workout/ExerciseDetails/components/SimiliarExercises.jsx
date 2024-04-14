import React from "react";
import { Typography, Box, Stack } from "@mui/material";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ExerciseCard from "../../components/ExerciseCard.jsx";
const SplideCarousel = ({ data }) => {
  return (
    <Splide
      options={{
        perPage: 1,
        arrow: false,
        pagination: false,
        drag: "free",
        gap: "2rem",
        mediaQuery: "min",
        breakpoints: {
          1540: {
            perPage: 4,
          },
          1300: {
            perPage: 3,
          },
          1140: {
            perPage: 2,
          },
          1024: {
            perPage: 3,
          },
          768: {
            perPage: 2,
          },
          640: {
            perPage: 1,
          },
        },
      }}
    >
      {data.map((item, index) => (
        <SplideSlide
          key={index}
          className="min-h-[15rem] min-w-[10rem] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105 bg-[#0b6e4f] flex items-center justify-center  cursor-pointer"
        >
          <div itemID={item.id || item} title={item.id || item}>
            <ExerciseCard exercise={item} />
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
};

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box className="mt-4">
      <div>
        <Typography
          sx={{ fontSize: { lg: "35px", xs: "20px" } }}
          className="text-white"
          fontWeight={700}
          mb="33px"
        >
          Similar{" "}
          <span className="text-green-600 captalize">Target Muscle</span>{" "}
          exercises
        </Typography>
        {targetMuscleExercises && (
          <SplideCarousel data={targetMuscleExercises} />
        )}
      </div>
      <div className="mt-4">
        <Typography
          sx={{ fontSize: { lg: "35px", xs: "20px" } }}
          className="text-white"
          fontWeight={700}
          mb="33px"
        >
          Similar <span className="text-green-600 captalize">Equipment</span>{" "}
          exercises
        </Typography>
        {equipmentExercises && <SplideCarousel data={equipmentExercises} />}
      </div>
    </Box>
  );
};

export default SimilarExercises;

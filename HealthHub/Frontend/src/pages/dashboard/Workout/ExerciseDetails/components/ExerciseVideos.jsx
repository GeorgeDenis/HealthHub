import React, { useEffect } from "react";
import { Typography, Box, Stack } from "@mui/material";
import Loader from "../Loader.jsx";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <div>
      <Typography
        sx={{ fontSize: { lg: "35px", xs: "20px" } }}
        className="text-white"
        fontWeight={700}
        mb="33px"
      >
        Watch <span className="text-green-600">{name}</span> exercise videos
      </Typography>
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
        {exerciseVideos?.slice(0, 5)?.map((item, index) => (
          <SplideSlide
            key={index}
            className="min-h-[15rem] min-w-[15rem] rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105 bg-[#0b6e4f] flex items-center justify-center  cursor-pointer"
          >
            <a
              key={index}
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="h-[200px] rounded-lg"
                src={item.video.thumbnails[0].url}
                alt={item.video.title}
              />
              <div className="p-2">
                <p className="text-md font-bold mt-4" fontWeight={600}>
                  {item.video.title}
                </p>
                <p className="text-sm">{item.video.channelName}</p>
              </div>
            </a>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default ExerciseVideos;

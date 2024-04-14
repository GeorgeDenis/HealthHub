import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import BodyPart from "./BodyPart";

const HorizontalScrollbar = ({ data, bodyPart, handleBodyPartChange }) => {
  return (
    <div className="w-full">
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
              <BodyPart
                item={item}
                bodyPart={bodyPart}
                handleBodyPartChange={handleBodyPartChange}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default HorizontalScrollbar;

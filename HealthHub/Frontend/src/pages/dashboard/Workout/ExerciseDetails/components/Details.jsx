import React from "react";
import { Typography, Stack, Button, Card } from "@mui/material";
import WeightIcon from "../../../../../../public/img/weight.png";
import TargetIcon from "../../../../../../public/img/target.png";
import BodyPartIcon from "../../../../../../public/img/bodyPart.png";
const Details = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment, instructions } =
    exerciseDetail;
  const extraDetail = [
    {
      icon: BodyPartIcon,
      name: bodyPart,
    },
    {
      icon: TargetIcon,
      name: target,
    },
    {
      icon: WeightIcon,
      name: equipment,
    },
  ];
  return (
    <div className="w-full md:w-[75%] 3xl:w-[60%]  mx-auto mt-[2rem] mb-[4rem] p-4 shadow-lg rounded-lg  flex flex-col  items-center justify-center bg-[#0b6e4f] gap-8">
      <Typography
        className="text-green-500"
        sx={{ fontSize: { lg: "35px", xs: "25px" } }}
        fontWeight={700}
        textTransform="capitalize"
      >
        {name}
      </Typography>
      <div className="flex flex-col 2xl:flex-row gap-10 items-center justify-center w-full">
        <img
          src={gifUrl}
          alt={name}
          loading="lazy"
          className="w-[300px] h-[300px] rounded-lg"
        />
        <div className="flex flex-col items-center gap-4">
          {extraDetail?.map((item, index) => (
            <div className="flex items-center gap-4 w-full" key={index}>
              <Button
                sx={{
                  background: "#FFF2DB",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={item.icon}
                  alt={bodyPart}
                  style={{ width: "45px", height: "40px" }}
                />
              </Button>
              <p
                className="text-white font-bold capitalize text-base"
              >
                {item.name}
              </p>
            </div>
          ))}
          {/* <button className="w-20 h-14 bg-green-300 rounded-md text-white cursor-pointer">
            Quick add
          </button> */}
        </div>
      </div>

      <ol
        style={{ listStyleType: "decimal" }}
        className="bg-surface-darkest p-6 rounded-lg"
      >
        {instructions?.map((item, index) => (
          <li key={index} className="text-white">
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Details;

import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../../../../../public/img/muscles/back.png";
const BodyPart = ({ item, handleBodyPartChange, bodyPart }) => {
  return (
    <div
      className="flex flex-col items-center"
      onClick={() => handleBodyPartChange(item)}
    >
      <img
        src={`../../../../../public/img/muscles/${item}.png`}
        alt="dumbbell"
        className="w-full"
        style={{ width: "90px", height: "90px" }}
      />

      <Typography
        fontSize="20px"
        fontWeight="bold"
        color="#FFFFFF"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </div>
  );
};

export default BodyPart;

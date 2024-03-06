import React, { useState, useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { Card, CardContent } from "@mui/material";
import api from "@/services/api";
import { useUser } from "@/context/LoginRequired";
import { toast } from "react-toastify";
import ModeCommentIcon from "@mui/icons-material/ModeComment";

const LogBreakfast = () => {
  return (
    <div className="flex flex-col mt-4 px-1 mb-2">
      <div className="flex items-center mb-2">
        <ModeCommentIcon
          className="text-secondary"
          fontSize="extraSmall"
        ></ModeCommentIcon>
        <p className="text-gray-300 ml-1 text-md font-semibold">
          BreakFast
        </p>
      </div>
      <div
        className="text-surface-light overflow-auto max-h-[12rem]"
        style={{ scrollbarWidth: "thin" }}
      >
        <div className="flex flex-col gap-2">
          <CardContent className="p-2 bg-surface-mid-light">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <p className="text-surface-light text-sm font-semibold">
                  John Doe
                </p>
                <p className="text-surface-light text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </CardContent>
          <CardContent className="p-2 bg-surface-mid-light">
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <p className="text-surface-light text-sm font-semibold">
                  John Doe
                </p>
                <p className="text-surface-light text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <Button
        className="mt-6 w-[8rem] bg-secondary hover:bg-primary duration-200 "
        type="submit"
      >
        Add Food
      </Button>
    </div>
  );
};

export default LogBreakfast;

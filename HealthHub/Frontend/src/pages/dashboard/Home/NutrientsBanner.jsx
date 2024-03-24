import React from "react";
import { Typography } from "@material-tailwind/react";

const CircleProgress = ({ total, needed, progressColor }) => {
  const progressPercentage = (total / needed) * 100;

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-white">
      <svg
        className="progress-circle"
        width="120"
        height="120"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="10"
        />
        <text
          x="50"
          y="45"
          className="text-lg font-semibold fill-current text-white"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {total}
        </text>
        <text
          x="50"
          y="65"
          className="text-md font-semibold fill-current text-white text-xs"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          /{needed}g
        </text>
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="10"
          stroke={progressColor}
          strokeDasharray={`calc(283 * ${progressPercentage / 100}), 283`}
          strokeLinecap="round"
          style={{ transform: "rotate(-90deg) translate(-100%)" }}
        />
      </svg>
      <p className="text-sm">{needed - total}g left </p>
    </div>
  );
};

const NutrientsBanner = () => {
  return (
    <div className="w-[20rem] md:w-[26rem] bg-green-900 rounded-md p-6 shadow-lg">
      <div className="flex flex-col items-start gap-4">
        <Typography className="text-md font-semibold" color="white">
          Macros
        </Typography>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
          <CircleProgress total={36} needed={381} progressColor="#66b2b2" />
          <CircleProgress total={4} needed={153} progressColor="#7d12ff" />
          <CircleProgress total={9} needed={102} progressColor="#FF5F1F" />
        </div>
      </div>
    </div>
  );
};

export default NutrientsBanner;

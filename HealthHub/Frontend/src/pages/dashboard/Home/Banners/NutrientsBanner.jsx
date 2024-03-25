import React, { useEffect } from "react";
import { Typography } from "@material-tailwind/react";

const CircleProgress = ({ total, needed, progressColor, dimension,category }) => {
  const progressPercentage = (total / needed) * 100;
  let width = dimension === "small" ? 80 : 120;
  let height = width;
  let cx = width / 2;
  let cy = height / 2;
  let r = (width / 2) * 0.75; 

  let fontSizeFirst = dimension === "small" ? "12" : "16"; 
  let fontSizeSecond = dimension === "small" ? "10" : "14"; 
  let viewBox = `0 0 ${width} ${height}`;

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-white">
      <p className="text-white text-sm font-semibold">{category}</p>
      <svg
        className="progress-circle"
        width={width}
        height={height}
        viewBox={viewBox}
      >
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="9"
        />
        <text
          x={cx}
          y={cy - 10} 
          fontSize={fontSizeFirst}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
        >
          {total}
        </text>
        <text
          x={cx}
          y={cy + 10} 
          fontSize={fontSizeSecond}
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="white"
        >
          /{needed}g
        </text>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          strokeWidth="10"
          stroke={progressColor}
          strokeDasharray={`${(283 * progressPercentage) / 100} 283`}
          strokeLinecap="round"
          style={{ transform: `rotate(-90deg) translate(-${width}px, 0px)` }}
          transform={`rotate(-90, ${cx}, ${cy})`} 
        />
      </svg>
      <p className="text-sm">{needed - total}g left</p>
    </div>
  );
};

const NutrientsBanner = ({totalNutrients,macronutrientsNeeded}) => {
  const [dimension, setDimension] = React.useState("small");
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setDimension("large");
      } else {
        setDimension("small");
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="w-[20rem] md:w-[25rem] h-[15rem] bg-green-900 rounded-md p-4 shadow-lg ">
      <div className="flex flex-col items-start gap-4">
        <Typography className="text-md font-semibold" color="white">
          Macros
        </Typography>
        <div className="w-full flex flex-row items-center justify-between gap-1">
          <CircleProgress
            total={totalNutrients.carbohydrates || 0}
            needed={macronutrientsNeeded.carbohydrates  || 0}
            progressColor="#66b2b2"
            dimension={dimension}
            category="Carbohydrates"
          />
          <CircleProgress
            total={totalNutrients.protein || 0}
            needed={macronutrientsNeeded.protein || 0}
            progressColor="#7d12ff"
            dimension={dimension}
            category="Proteins"
          />
          <CircleProgress
            total={totalNutrients.fat || 0}
            needed={macronutrientsNeeded.fats || 0}
            progressColor="#FF5F1F"
            dimension={dimension}
            category="Fats"
          />
        </div>
      </div>
    </div>
  );
};

export default NutrientsBanner;

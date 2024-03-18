import React from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";

const LevelOfCompletion = ({ level,type }) => {
  const validLevel = Math.min(100, Math.max(0, level));
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1 w-12">
      <div className="relative h-1 flex items-center justify-center">
        <div
          className="absolute top-0 bottom-0 left-0 rounded-lg bg-green-400"
          style={{ width: `${validLevel}%` }}
        ></div>
      </div>
    </div>
  );
};

const NutrientsRemaining = ({
  totalNutrients,
  macronutrientsNeeded,
  calories,
  setIsCaloriesShown,
}) => {
  const calculateLevel = (total, current) => {
    console.log(total, current);
    return  Math.min(100, Math.abs(((total - current) * 100) / total));
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <Typography
          variant="h6"
          className="mb-1 mt-2 text-surface-light self-start"
        >
          {"Nutrients Remaining"}
        </Typography>
        <SwitchRightIcon
          className="text-surface-light cursor-pointer"
          onClick={() => setIsCaloriesShown(true)}
        />
      </div>
      <div className="flex gap-3 lg:gap-6 w-2/3 items-center">
        <div>
          <div className="flex flex-col items-center">
            <Typography className="mb-1 text-surface-light ">
              {macronutrientsNeeded.protein - totalNutrients.protein}
            </Typography>
            <Typography className="mb-1 text-surface-light ">
              {"Protein(g)"}
            </Typography>
          </div>
          <LevelOfCompletion level={calculateLevel(macronutrientsNeeded.protein,totalNutrients.protein)} type={"protein"}/>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <Typography className="mb-1 text-surface-light ">
              {macronutrientsNeeded.carbohydrates -
                totalNutrients.carbohydrates}
            </Typography>
            <Typography className="mb-1 text-surface-light ">
              {"Carbs(g)"}
            </Typography>
          </div>
          <LevelOfCompletion level={calculateLevel(macronutrientsNeeded.carbohydrates,totalNutrients.carbohydrates)} type={"carbohydrates"}/>
        </div>
        <div>
          <div className="flex flex-col items-center">
            <Typography className="mb-1 text-surface-light ">
              {macronutrientsNeeded.fat - totalNutrients.fat}
            </Typography>
            <Typography className="mb-1 text-surface-light ">
              {"Fat(g)"}
            </Typography>
          </div>
          <LevelOfCompletion
            level={calculateLevel(macronutrientsNeeded.fat, totalNutrients.fat)}
            type={"fat"}
          />
        </div>

        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-green-400 ">{calories}</Typography>
          <Typography className="mb-1 text-surface-light ">
            {"Calories"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NutrientsRemaining;

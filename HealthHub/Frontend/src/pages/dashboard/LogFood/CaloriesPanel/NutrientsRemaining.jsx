import React from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import SwitchRightIcon from "@mui/icons-material/SwitchRight";

const NutrientsRemaining = ({
  totalNutrients,
  macronutrientsNeeded,
  calories,
  setIsCaloriesShown,
}) => {
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
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light ">
            {macronutrientsNeeded.protein - totalNutrients.protein}
          </Typography>
          <Typography className="mb-1 text-surface-light ">
            {"Protein(g)"}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light ">
            {macronutrientsNeeded.carbohydrates - totalNutrients.carbohydrates}
          </Typography>
          <Typography className="mb-1 text-surface-light ">
            {"Carbs(g)"}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light ">
            {macronutrientsNeeded.fat - totalNutrients.fat}
          </Typography>
          <Typography className="mb-1 text-surface-light ">
            {"Fat(g)"}
          </Typography>
        </div>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-green-400 ">
            {calories}
          </Typography>
          <Typography className="mb-1 text-surface-light ">
            {"Calories"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default NutrientsRemaining;

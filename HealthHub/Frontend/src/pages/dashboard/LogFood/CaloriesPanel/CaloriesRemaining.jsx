import React from "react";
import { Input, Avatar, Typography } from "@material-tailwind/react";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";

const CaloriesRemaining = ({
  calories,
  totalFoodsCalories,
  totalCardioCalories,
  setIsCaloriesShown,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer">
        <Typography
          variant="h6"
          className="mb-1 mt-2 text-surface-light self-start text-md"
        >
          {"Calories Remaining"}
        </Typography>
        <SwitchLeftIcon
          className="text-surface-light"
          onClick={() => setIsCaloriesShown(false)}
        />
      </div>
      <div className="flex gap-3 lg:gap-6 w-2/3 items-center">
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">
            {calories}
          </Typography>
          <Typography className="mb-1 text-surface-light">{"Goal"}</Typography>
        </div>
        <Typography className="mb-1 text-surface-light">-</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">
            {totalFoodsCalories}
          </Typography>
          <Typography className="mb-1 text-surface-light">{"Food"}</Typography>
        </div>
        <Typography className="mb-1 text-surface-light">+</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-surface-light">
            {totalCardioCalories}
          </Typography>
          <Typography className="mb-1 text-surface-light">
            {"Exercise"}
          </Typography>
        </div>
        <Typography className="mb-1 text-surface-light">=</Typography>
        <div className="flex flex-col items-center">
          <Typography className="mb-1 text-green-400 font-semibold">
            {calories - totalFoodsCalories + totalCardioCalories}
          </Typography>
          <Typography className="mb-1 text-surface-light">
            {"Remaining"}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default CaloriesRemaining;

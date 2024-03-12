import React, { useState,useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import {
  Input,
  Select,
  Option,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useUser } from "@/context/LoginRequired";
const QuickAddModal = ({
  quickAddModalOpen,
  handleCloseQuickAddModal,
  sectionName,
}) => {
  const currentUser = useUser();
  const [mealType, setMealType] = useState("1");
  const [foodItem, setFoodItem] = useState({
    foodName: "",
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });

  const handleNutrientChange = (e, type) => {
    setFoodItem({
      ...foodItem,
      [type]: e.target.value,
    });
  };
  useEffect(() => {
    setFoodItem({
      foodName: "",
      calories: 0,
      fat: 0,
      carbohydrates: 0,
      protein: 0,
    });
  }, [quickAddModalOpen]);
      
  const logFood = async () => {
    const mealTypeConverted = parseInt(mealType);
    try {
      const response = await api.post(
        `/api/v1/LoggedFood`,
        {
          userId: currentUser.userId,
          foodName: foodItem.foodName,
          calories: foodItem.calories,
          protein: foodItem.protein,
          carbohydrates: foodItem.carbohydrates,
          fat: foodItem.fat,
          mealType: mealTypeConverted,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Food logged successfully");
        handleCloseQuickAddModal();
      }
    } catch (error) {
      console.error("Error logging food:", error);
      toast.error("Error logging food");
    }
  };

  return (
    <div className="h-full">
      <Modal open={quickAddModalOpen} onClose={handleCloseQuickAddModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw]  bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <Typography color="white">Meal</Typography>

              <select
                className="!border-surface-light text-surface-dark focus:!border-secondary rounded-lg select-none w-[10rem] p-2"
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
              >
                <option value="1" className="text-surface-mid-light">
                  Breakfast
                </option>
                <option value="2" className="text-surface-mid-light">
                  Lunch
                </option>
                <option value="3" className="text-surface-mid-light">
                  Dinner
                </option>
                <option value="4" className="text-surface-mid-light">
                  Snack
                </option>
              </select>
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Name</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodItem.foodName}
                onChange={(e) => handleNutrientChange(e, "foodName")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Calories</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodItem.calories}
                onChange={(e) => handleNutrientChange(e, "calories")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Total Fat g:</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodItem.fat}
                onChange={(e) => handleNutrientChange(e, "fat")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Total Carbohydrates:</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodItem.carbohydrates}
                onChange={(e) => handleNutrientChange(e, "carbohydrates")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Total Protein: </Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodItem.protein}
                onChange={(e) => handleNutrientChange(e, "protein")}
              />
            </div>
            <Button
              className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
              onClick={() => {
                logFood();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default QuickAddModal;

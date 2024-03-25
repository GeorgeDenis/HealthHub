import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useUser } from "@/context/LoginRequired";
import { Typography, Button } from "@material-tailwind/react";
const SearchedAddModal = ({
  isSearchAddModalOpen,
  handleCloseSearchAddModal,
  foodItem,
  sectionName,
  refetchLoggedFoods,
}) => {
  const currentUser = useUser();
  const [foodToAdd, setFoodToAdd] = useState({
    foodName: "",
    calories: 0,
    servingSizeInGrams: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });
  const [originalFoodItem, setOriginalFoodItem] = useState({
    foodName: "",
    calories: 0,
    servingSizeInGrams: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
  });

  useEffect(() => {
    setFoodToAdd({
      foodName: foodItem.name || "",
      calories: foodItem.calories || 0,
      servingSizeInGrams: foodItem.servingSizeInGrams || 0,
      fat: foodItem.fat || 0,
      carbohydrates: foodItem.carbohydrates || 0,
      protein: foodItem.protein || 0,
    });
    setOriginalFoodItem({
      foodName: foodItem.name || "",
      calories: foodItem.calories || 0,
      servingSizeInGrams: foodItem.servingSizeInGrams || 0,
      fat: foodItem.fat || 0,
      carbohydrates: foodItem.carbohydrates || 0,
      protein: foodItem.protein || 0,
    });
  }, [isSearchAddModalOpen]);
  const handleFoodChange = (e, type) => {
    if (type === "servingSizeInGrams") {
      const servingSize = originalFoodItem.servingSizeInGrams;
      const calories = parseInt(
        (e.target.value * originalFoodItem.calories) / servingSize,
      );
      const protein = parseInt(
        (originalFoodItem.protein * e.target.value) / servingSize,
      );
      const fat = parseInt(
        (originalFoodItem.fat * e.target.value) / servingSize,
      );
      const carbohydrates = parseInt(
        (originalFoodItem.carbohydrates * e.target.value) / servingSize,
      );
      setFoodToAdd({
        ...foodToAdd,
        [type]: e.target.value,
        calories,
        protein,
        fat,
        carbohydrates,
      });
    } else {
      setFoodToAdd({
        ...foodToAdd,
        [type]: e.target.value,
      });
    }
  };
  const handleAddSearchedFood = async () => {
    if (foodToAdd.servingSize < 20) {
      toast.error("Serving size must be at least 20g");
      return;
    }
    const mealTypeConverted =
      sectionName === "Breakfast"
        ? 1
        : sectionName === "Lunch"
        ? 2
        : sectionName === "Dinner"
        ? 3
        : 4;
    try {
      const response = await api.post(
        `/api/v1/LoggedFood`,
        {
          userId: currentUser.userId,
          foodName: foodToAdd.foodName,
          calories: foodToAdd.calories,
          protein: foodToAdd.protein,
          servingSize: foodToAdd.servingSizeInGrams,
          carbohydrates: foodToAdd.carbohydrates,
          fat: foodToAdd.fat,
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
        refetchLoggedFoods();
        handleCloseSearchAddModal();
      }
    } catch (error) {
      console.error("Error logging food:", error);
      toast.error("Error logging food");
    }
  };
  return (
    <>
      <Modal open={isSearchAddModalOpen} onClose={handleCloseSearchAddModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] md:min-h-[32rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="flex flex-col gap-6">
            <Typography
              className="text-md font-semibold mx-auto rounded bg-secondary p-2"
              color="white"
            >
              Add Food
            </Typography>
            <div className="flex justify-between items-center">
              <Typography color="white">Name:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.foodName}
                onChange={(e) => handleFoodChange(e, "foodName")}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Calories:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.calories}
                onChange={(e) => handleFoodChange(e, "calories")}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Serving size(g):</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.servingSizeInGrams}
                onChange={(e) => handleFoodChange(e, "servingSizeInGrams")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Protein:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.protein}
                onChange={(e) => handleFoodChange(e, "protein")}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Total Fat g:</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.fat}
                onChange={(e) => handleFoodChange(e, "fat")}
                readOnly
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Total Carbohydrates:</Typography>
              <input
                type="number"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={foodToAdd.carbohydrates}
                onChange={(e) => handleFoodChange(e, "carbohydrates")}
                readOnly
              />
            </div>
            <Button
              className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
              onClick={() => {
                handleAddSearchedFood();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SearchedAddModal;

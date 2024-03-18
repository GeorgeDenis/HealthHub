import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { Typography, Button } from "@material-tailwind/react";
import { useUser } from "@/context/LoginRequired";

const BarcodeAddModal = ({
  barcodeAddModalOpen,
  handleCloseBarcodeAddModal,
  sectionName,
  refetchLoggedFoods,
}) => {
  const currentUser = useUser();
  const [barcode, setBarcode] = useState("");
  const [foodItem, setFoodItem] = useState({});
  const [originalFoodItem, setOriginalFoodItem] = useState({});

  useEffect(() => {
    setBarcode("");
    setFoodItem(null);
    setOriginalFoodItem(null);
  }, [barcodeAddModalOpen]);

  const handleNutrientChange = (e, type) => {
    if (type === "servingSize") {
      const servingSize = originalFoodItem.servingSize;
      const calories =
        parseInt((e.target.value * originalFoodItem.calories) / servingSize);
      const protein = parseInt(
        (originalFoodItem.protein * e.target.value) / servingSize,
      );
      const fat = parseInt(
        (originalFoodItem.fat * e.target.value) / servingSize,
      );
      const carbohydrates = parseInt(
        (originalFoodItem.carbohydrates * e.target.value) / servingSize,
      );
      setFoodItem({
        ...foodItem,
        [type]: e.target.value,
        calories,
        protein,
        fat,
        carbohydrates,
      });
    } else {
      setFoodItem({
        ...foodItem,
        [type]: e.target.value,
      });
    }
  };

  const handleSearchFoodByBarcode = async () => {
    if(!barcode){
      toast.error("Please enter a barcode");
      return;
    }
    try {
      const response = await api.get(
        `/api/v1/LoggedFood/search-food/byCode/${barcode}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        if(response.data.name === ""){
          toast.error("Food not found");
          return;
        }
        setFoodItem({
          foodName: response.data.name,
          calories: parseInt(response.data.calories),
          protein: parseInt(response.data.protein),
          fat: parseInt(response.data.fat),
          carbohydrates: parseInt(response.data.carbohydrates),
          servingSize: parseInt(response.data.servingSizeInGrams),
        });
        setOriginalFoodItem({
          foodName: response.data.name,
          calories: parseInt(response.data.calories),
          protein: parseInt(response.data.protein),
          fat: parseInt(response.data.fat),
          carbohydrates: parseInt(response.data.carbohydrates),
          servingSize: parseInt(response.data.servingSizeInGrams),
        });
      }
    } catch (error) {
      toast.error("Error fetching foods");
    }
  };
  const handleAddBarcodeFood = async () => {
    console.log("foodItem", foodItem);
    if (foodItem.servingSize < 20) {
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
    console.log("mealTypeConverted", foodItem);
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
        handleCloseBarcodeAddModal();
        refetchLoggedFoods();
      }
    } catch (error) {
      console.error("Error logging food:", error);
      toast.error("Error logging food");
    }
  };
  return (
    <div className="h-full">
      <Modal open={barcodeAddModalOpen} onClose={handleCloseBarcodeAddModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          {!foodItem && (
            <div className="flex flex-col items-center gap-2 my-2">
              <Typography color="white">
                Enter your meal's barcode to log it quickly
              </Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[12rem]  border border-gray-300 p-2"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
              />
              <Button
                className="shadow-md bg-secondary hover:bg-primary ml-auto"
                size="sm"
                onClick={() => {
                  handleSearchFoodByBarcode();
                }}
              >
                Search
              </Button>
            </div>
          )}
          {foodItem && (
            <div className="flex flex-col justify-between gap-6">
              <div className="flex justify-between items-center">
                <Typography color="white">Name</Typography>
                <input
                  type="text"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.foodName}
                  onChange={(e) => handleNutrientChange(e, "foodName")}
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <Typography color="white">Calories</Typography>
                <input
                  type="number"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.calories}
                  onChange={(e) => handleNutrientChange(e, "calories")}
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <Typography color="white">Serving size (g)</Typography>
                <input
                  type="number"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.servingSize}
                  onChange={(e) => handleNutrientChange(e, "servingSize")}
                />
              </div>
              <div className="flex justify-between items-center">
                <Typography color="white">Total Fat (g):</Typography>
                <input
                  type="number"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.fat}
                  onChange={(e) => handleNutrientChange(e, "fat")}
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <Typography color="white">Total Carbohydrates (g):</Typography>
                <input
                  type="number"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.carbohydrates}
                  onChange={(e) => handleNutrientChange(e, "carbohydrates")}
                  readOnly
                />
              </div>
              <div className="flex justify-between items-center">
                <Typography color="white">Total Protein (g): </Typography>
                <input
                  type="number"
                  className=" bg-surface-light rounded-lg w-[7rem]  border border-gray-300 p-2"
                  value={foodItem.protein}
                  onChange={(e) => handleNutrientChange(e, "protein")}
                  readOnly
                />
              </div>
              <Button
                className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
                onClick={() => {
                  handleAddBarcodeFood();
                }}
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default BarcodeAddModal;

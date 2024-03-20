import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import api from "../../../services/api";
import { toast } from "react-toastify";
import SortIcon from "@mui/icons-material/Sort";

import { useUser } from "@/context/LoginRequired";
import {
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";

import CropFreeIcon from "@mui/icons-material/CropFree";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import QuickAddModal from "./FoodModals/QuickAddModal";
import ScanFoodModal from "./FoodModals/ScanFoodModal";
import BarcodeAddModal from "./FoodModals/BarcodeAddModal";
import ExerciseModal from "./LogExercise/ExerciseModal";
const FoodModal = ({
  modalOpen,
  handleClose,
  sectionName,
  refetchLoggedFoods,
}) => {
  const currentUser = useUser();
  const [foods, setFoods] = useState([]);
  const [sortType, setSortType] = useState();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isScanFoodModalOpen, setIsScanFoodModalOpen] = useState(false);
  const [isBarcodeFoodModalOpen, setIsBarcodeFoodModalOpen] = useState(false);


  useEffect(() => {
    fetchLoggedFoods();
  }, []);

  useEffect(() => {
    fetchLoggedFoods();
  }, [isScanFoodModalOpen, isQuickAddModalOpen, isBarcodeFoodModalOpen]);

  const fetchLoggedFoods = async () => {
    try {
      const response = await api.get(
        `/api/v1/LoggedFood/get-recent/?userId=${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        const sortedFoods = response.data.loggedFoods
          .sort((a, b) => {
            return new Date(b.dateLogged) - new Date(a.dateLogged);
          })
          .map((food) => {
            return {
              foodName: food.foodName,
              servingSize: food.servingSize,
              numberOfServings: food.numberOfServings,
              calories: food.calories,
              protein: food.protein,
              carbohydrates: food.carbohydrates,
              fat: food.fat,
              mealType: food.mealType,
              dateLogged: food.dateLogged,
            };
          });

        setFoods(sortedFoods);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  const addRecentFood = async (food) => {
    const mealType =
      sectionName === "Breakfast"
        ? 1
        : sectionName === "Lunch"
        ? 2
        : sectionName === "Dinner"
        ? 3
        : 4;
    if (
      food.foodName === "" ||
      food.servingSize === "" ||
      food.numberOfServings === "" ||
      food.calories === "" ||
      food.protein === "" ||
      food.carbohydrates === "" ||
      food.fat === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await api.post(
        `/api/v1/LoggedFood`,
        {
          userId: currentUser.userId,
          foodName: food.foodName,
          servingSize: food.servingSize,
          numberOfServings: food.numberOfServings,
          calories: food.calories,
          protein: food.protein,
          carbohydrates: food.carbohydrates,
          fat: food.fat,
          mealType,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Food added successfully");
        refetchLoggedFoods();
        handleClose();
      }
    } catch (error) {
      toast.error("Error adding food");
    }
  };
  const handleSortMenu = (sortType) => {
    let sortedFoods;
    switch (sortType) {
      case 1:
        sortedFoods = [...foods].sort(
          (a, b) => new Date(b.dateLogged) - new Date(a.dateLogged),
        );
        break;
      case 2:
        sortedFoods = [...foods].sort((a, b) =>
          a.foodName.localeCompare(b.foodName),
        );
        break;
      case 3:
        sortedFoods = [...foods].sort((a, b) =>
          b.foodName.localeCompare(a.foodName),
        );
        break;
      default:
        sortedFoods = [...foods];
        break;
    }
    setFoods(sortedFoods);
    setSortType(sortType);
    setSortMenuOpen(false);
  };

  const handleOpenQuickAddModal = () => {
    setIsQuickAddModalOpen(true);
  };
  const handleCloseQuickAddModal = () => {
    setIsQuickAddModalOpen(false);
  };

  const handleOpenScanFoodModal = () => {
    setIsScanFoodModalOpen(true);
  };
  const handleCloseScanFoodModal = () => {
    setIsScanFoodModalOpen(false);
  };
  const handleCloseBarcodeFoodModal = () => {
    setIsBarcodeFoodModalOpen(false);
  };
  const handleOpenBarcodeFoodModal = () => {
    setIsBarcodeFoodModalOpen(true);
  };


  const handleSearchFood = async () => {
    try {
      const response = await api.get(
        `api/v1/LoggedFood/search-food/byName/${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        setSearchText("");
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  return (
    <>
      <Modal open={modalOpen} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="relative">
            <Input
              label="Search"
              color="green"
              crossOrigin={undefined}
              className="text-white w-full"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              icon={
                <i
                  className="fa-solid fa-search cursor-pointer"
                  onClick={() => handleSearchFood()}
                />
              }
              // inputRef={inputRef}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs md:text-base">
            <div
              className="flex flex-col  items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light"
              onClick={() => {
                handleOpenScanFoodModal();
              }}
            >
              <RestaurantIcon className="text-surface-light" />
              <p>Scan a Meal</p>
            </div>
            <div
              className="flex flex-col items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light"
              onClick={() => {
                handleOpenBarcodeFoodModal();
              }}
            >
              <CropFreeIcon className="text-surface-light" />
              <p>Barcode</p>
            </div>
            <div
              className="flex flex-col items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light"
              onClick={() => {
                handleOpenQuickAddModal();
              }}
            >
              <AddTaskIcon className="text-surface-light" />
              <p>Quick Add</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between mt-4">
              <Typography color="green">Recent Foods</Typography>
              <div className="flex gap-1">
                <SortIcon
                  className="text-surface-light"
                  onClick={() => {
                    setSortMenuOpen(!sortMenuOpen);
                  }}
                />
                {sortMenuOpen && (
                  <select
                    className="w-[10rem] rounded text-surface-light bg-green-700"
                    value={sortType}
                    onChange={(e) => {
                      handleSortMenu(Number(e.target.value));
                    }}
                  >
                    <option value="1">Most Recent</option>
                    <option value="2">A to Z</option>
                    <option value="3">Z to A</option>
                  </select>
                )}
              </div>
            </div>

            <div
              className="text-surface-light overflow-auto max-h-[18rem] flex flex-col gap-3"
              style={{ scrollbarWidth: "none" }}
            >
              {foods.length > 0 ? (
                foods.map((food, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-md w-full p-2 bg-green-700 text-surface-light cursor-pointer"
                  >
                    <div>
                      <p className="text-md">{food.foodName}</p>
                      <p className="text-gray-300 md:text-sm text-xs">
                        {food.calories} calories
                        {food.servingSize > 0 && `, ${food.servingSize} g`}
                      </p>
                    </div>
                    <div>
                      {food.servingSize && (
                        <p className="text-gray-300 md:text-sm text-xs">
                          Serving size: {food.servingSize}
                        </p>
                      )}
                      {food.numberOfServings && (
                        <p className="text-gray-300 md:text-sm text-xs">
                          Number of servings: {food.numberOfServings}
                        </p>
                      )}
                    </div>

                    <AddCircleIcon
                      onClick={() => {
                        addRecentFood(food);
                      }}
                    />
                  </div>
                ))
              ) : (
                <div className="border rounded-md w-full p-2 bg-green-700 text-surface-light cursor-pointer">
                  <p>No foods logged yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
      <QuickAddModal
        quickAddModalOpen={isQuickAddModalOpen}
        handleCloseQuickAddModal={handleCloseQuickAddModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
      />
      <ScanFoodModal
        scanFoodModalOpen={isScanFoodModalOpen}
        handleCloseScanFoodModal={handleCloseScanFoodModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
      />
      <BarcodeAddModal
        barcodeAddModalOpen={isBarcodeFoodModalOpen}
        handleCloseBarcodeAddModal={handleCloseBarcodeFoodModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
      />
      
    </>
  );
};

export default FoodModal;
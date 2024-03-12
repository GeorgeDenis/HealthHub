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
const FoodModal = ({ modalOpen, handleClose, sectionName }) => {
  const currentUser = useUser();
  const [foods, setFoods] = useState([]);
  const [sortType, setSortType] = useState(1);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);

  useEffect(() => {
    fetchLoggedFoods();
  }, []);

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

      if (response.status === 201) {
        toast.success("Food added successfully");
      }
    } catch (error) {
      toast.error("Error adding food");
    }
  };
  const handleSortMenu = (sortType) => {
    console.log(sortType);
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

  return (
    <>
      <Modal open={modalOpen} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="relative">
            <Input
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              // onFocus={() => searchValue && setIsMenuOpen(true)}
              label="Search"
              color="green"
              crossOrigin={undefined}
              className="text-white w-full"
              icon={<i className="fa-solid fa-search" />}
              // inputRef={inputRef}
            />
          </div>
          <div className="flex justify-between mt-2">
            <div className="flex flex-col items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light">
              <RestaurantIcon className="text-surface-light" />
              <p className="text-sm">Scan a Meal</p>
            </div>
            <div className="flex flex-col items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light">
              <CropFreeIcon className="text-surface-light" />
              <p className="text-sm">Barcode</p>
            </div>
            <div
              className="flex flex-col items-center gap-3 border rounded-md p-2 w-[30%] bg-green-700 cursor-pointer text-surface-light"
              onClick={() => {
                handleOpenQuickAddModal();
              }}
            >
              <AddTaskIcon className="text-surface-light" />
              <p className="text-sm">Quick Add</p>
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
                      <p className="text-gray-300 text-sm">
                        {food.calories} calories, {food.servingSize} g
                      </p>
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
      />
    </>
  );
};

export default FoodModal;

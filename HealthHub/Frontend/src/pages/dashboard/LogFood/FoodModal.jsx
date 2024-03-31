import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import api from "../../../services/api";
import { toast } from "react-toastify";
import SortIcon from "@mui/icons-material/Sort";
import { Spinner } from "@material-tailwind/react";

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
import SearchedAddModal from "./FoodModals/SearchedAddModal";

const FoodModal = ({
  modalOpen,
  handleClose,
  sectionName,
  refetchLoggedFoods,
  selectedDate,
}) => {
  const currentUser = useUser();
  const [foods, setFoods] = useState([]);
  const [searchedFoods, setSearchedFoods] = useState([]);
  const [sortType, setSortType] = useState();
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedFoodToAdd, setSearchedFoodToAdd] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isScanFoodModalOpen, setIsScanFoodModalOpen] = useState(false);
  const [isBarcodeFoodModalOpen, setIsBarcodeFoodModalOpen] = useState(false);
  const [isSearchAddModalOpen, setIsSearchAddModalOpen] = useState(false);
  useEffect(() => {
    setSearchedFoods([]);
    setSearchText("");
    fetchLoggedFoods();
  }, [modalOpen,handleClose]);

  useEffect(() => {
    fetchLoggedFoods();
  }, [isScanFoodModalOpen, isQuickAddModalOpen, isBarcodeFoodModalOpen]);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSearchedFoods([]);
    }
  };
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
          dateLogged: selectedDate,
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
  const handleOpenSearchAddModal = (foodItem) => {
    setSearchedFoodToAdd(foodItem);
    setIsSearchAddModalOpen(true);
  };
  const handleCloseSearchAddModal = () => {
    refetchLoggedFoods();
    setIsSearchAddModalOpen(false);
  };

  const handleSearchFood = async () => {
    if(!searchText) {
      toast.error("Please enter a food name to search");
      return;
    }
    setIsSearching(true);
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
        const foodArray = response.data.map((food) => {
          return {
            name: food.name,
            calories: parseInt(food.calories),
            servingSizeInGrams: parseInt(food.servingSizeInGrams),
            protein: parseInt(food.protein),
            carbohydrates: parseInt(food.carbohydrates),
            fat: parseInt(food.fat),
          };
        });
        setSearchedFoods(foodArray);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Modal open={modalOpen} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] md:min-h-[32rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="relative">
            <Input
              label="Search for a food"
              color="green"
              crossOrigin={undefined}
              className="text-white w-full"
              value={searchText}
              onChange={handleSearchText}
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
          {searchText && searchedFoods.length > 0 && (
            <div className="flex flex-col justify-between mt-4">
              <Typography color="green">Searched Foods</Typography>
              <div className="flex flex-col gap-2">
                {searchedFoods.map((food, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-md w-full p-2 bg-green-700 text-surface-light gap-2 hover:bg-green-500"
                  >
                    <div>
                      <p className="text-md">{food.name}</p>
                      <p className="text-gray-300 md:text-sm text-xs">
                        {food.calories} calories
                        {food.servingSizeInGrams > 0 &&
                          `, ${food.servingSizeInGrams} g`}
                      </p>
                    </div>
                    <div>
                      {food.servingSizeInGrams && (
                        <p className="text-gray-300 md:text-sm text-xs">
                          Serving size: {food.servingSizeInGrams}
                        </p>
                      )}
                    </div>
                    <AddCircleIcon
                        className="cursor-pointer"
                        onClick={() => handleOpenSearchAddModal(food)}
                      />
                  </div>
                ))}
              </div>
            </div>
          )}
          {!searchText && (
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
                      className="flex justify-between items-center border rounded-md w-full p-2 bg-green-700 text-surface-light"
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
                        className="cursor-pointer"
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
          )}
          {isSearching && (
            <div className={"flex justify-center my-48"}>
              <Spinner className={"h-8 w-8"} />
            </div>
          )}
        </div>
      </Modal>
      <QuickAddModal
        quickAddModalOpen={isQuickAddModalOpen}
        handleCloseQuickAddModal={handleCloseQuickAddModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
        selectedDate={selectedDate}
        
      />
      <ScanFoodModal
        scanFoodModalOpen={isScanFoodModalOpen}
        handleCloseScanFoodModal={handleCloseScanFoodModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
        selectedDate={selectedDate}
      />
      <BarcodeAddModal
        barcodeAddModalOpen={isBarcodeFoodModalOpen}
        handleCloseBarcodeAddModal={handleCloseBarcodeFoodModal}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
        selectedDate={selectedDate}
      />
      <SearchedAddModal 
        isSearchAddModalOpen={isSearchAddModalOpen}
        handleCloseSearchAddModal={handleCloseSearchAddModal}
        foodItem={searchedFoodToAdd}
        sectionName={sectionName}
        refetchLoggedFoods={refetchLoggedFoods}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default FoodModal;

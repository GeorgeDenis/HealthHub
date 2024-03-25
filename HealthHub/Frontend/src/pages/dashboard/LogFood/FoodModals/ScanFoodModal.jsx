import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { Button, Spinner } from "@material-tailwind/react";
import { useUser } from "@/context/LoginRequired";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const ScanFoodModal = ({
  scanFoodModalOpen,
  handleCloseScanFoodModal,
  sectionName,
  refetchLoggedFoods,
}) => {
  const currentUser = useUser();
  const [foodPhoto, setFoodPhoto] = useState(null);
  const [detectedFoodArray, setDetectedFoodArray] = useState([]);
  const [selectedFoodName, setSelectedFoodName] = useState("");
  const [foodItem, setFoodItem] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setFoodPhoto(null);
    setDetectedFoodArray([]);
  }, [scanFoodModalOpen]);

  const handleInputPhoto = (e) => {
    setFoodPhoto(e.target.files[0]);
  };

  const handleCancelScanFood = () => {
    setFoodPhoto(null);
    setDetectedFoodArray([]);
  };

  const handleScanFood = async () => {
    if (!foodPhoto) {
      toast.error("No photo selected");
      return;
    }
    setIsSearching(true);



    try {
      const formData = new FormData();
      formData.append("foodImage", foodPhoto);

      const response = await api.post(
        "/api/v1/LoggedFood/search-food/byImage",
        formData,
        {
          headers: {
            "Content-Type": undefined,
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        const uniqueFoodNames = Array.from(new Set(response.data.foodNames));
        setDetectedFoodArray(uniqueFoodNames);
        setFoodItem({
          calories: response.data.calories,
          protein: response.data.protein,
          fat: response.data.fat,
          carbohydrates: response.data.carbohydrates,
          servingSize: response.data.servingSizeInGrams,
        });
      } else {
        toast.error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      toast.error("Error detecting food: " + error.toString());
    } finally {
      setIsSearching(false);
    }
  };
  const handleAddScannedFood = async () => {
    if (!selectedFoodName) {
      toast.error("Please select a food to add");
      return;
    }
    //setFoodItem({ ...foodItem, foodName: selectedFoodName, servingSize: 1 });
    const mealTypeConverted =
      sectionName === "Breakfast"
        ? 1
        : sectionName === "Lunch"
        ? 2
        : sectionName === "Dinner"
        ? 3
        : 4;
    foodItem.calories = parseInt(foodItem.calories);
    foodItem.protein = parseInt(foodItem.protein);
    foodItem.fat = parseInt(foodItem.fat);
    foodItem.carbohydrates = parseInt(foodItem.carbohydrates);
    foodItem.servingSize = parseInt(foodItem.servingSize);

    try {
      const response = await api.post(
        `/api/v1/LoggedFood`,
        {
          userId: currentUser.userId,
          foodName: selectedFoodName,
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
        handleCloseScanFoodModal();
        refetchLoggedFoods();
      }
    } catch (error) {
      console.error("Error logging food:", error);
      toast.error("Error logging food");
    }
  };

  return (
    <div className="h-full">
      <Modal open={scanFoodModalOpen} onClose={handleCloseScanFoodModal}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] w-[90vw]  bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="flex flex-col items-center justify-between gap-4">
            {!foodPhoto && (
              <div className="flex flex-col items-center gap-4">
                <p className="text-surface-light rounded bg-green-500 p-2 font-semibold">
                  Upload a picture to identify your dish!
                </p>
                <div className="w-full flex justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleInputPhoto}
                    className="text-center file:border-0 file:text-surface-light file:bg-green-700 rounded-md ml-20"
                  />
                </div>
              </div>
            )}
            {detectedFoodArray.length === 0 && !isSearching && (
              <>
                <div className="flex flex-col gap-3 items-center justify-center mt-4">
                  {foodPhoto && (
                    <img
                      src={URL.createObjectURL(foodPhoto)}
                      alt="food"
                      className="w-30 h-30"
                    />
                  )}
                </div>
                {foodPhoto && (
                  <div className="flex gap-4">
                    <Button
                      className="shadow-md bg-gray-700 hover:bg-gray-500 ml-auto"
                      size="sm"
                      onClick={() => {
                        setFoodPhoto(null);
                        setDetectedFoodArray([]);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="shadow-md bg-secondary hover:bg-primary ml-auto"
                      size="sm"
                      onClick={handleScanFood}
                    >
                      Detect
                    </Button>
                  </div>
                )}
              </>
            )}
            {detectedFoodArray.length > 0 && (
              <div className="flex flex-col gap-4 items-start">
                <p className="text-surface-light">
                  Detected foods in the photo:
                </p>
                <div className="flex flex-col gap-2">
                  <FormControl className="text-surface-light">
                    <FormLabel
                      id="demo-radio-buttons-group-label"
                      className="text-surface-light"
                    ></FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                      className="text-surface-light"
                      onChange={(e) => {
                        setSelectedFoodName(e.target.value);
                      }}
                    >
                      {detectedFoodArray.map((foodName, index) => (
                        <FormControlLabel
                          key={index}
                          value={foodName}
                          control={<Radio />}
                          label={foodName}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="flex gap-4">
                  <Button
                    className="shadow-md bg-gray-700 hover:bg-gray-500 ml-auto"
                    size="sm"
                    onClick={() => {
                      handleCancelScanFood();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="shadow-md bg-secondary hover:bg-primary ml-auto"
                    size="sm"
                    onClick={() => {
                      handleAddScannedFood();
                    }}
                  >
                    Add food
                  </Button>
                </div>
              </div>
            )}
          </div>
          {isSearching && (
            <div className={"flex justify-center my-48"}>
              <Spinner className={"h-8 w-8"} />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ScanFoodModal;

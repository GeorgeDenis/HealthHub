// RecipeDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const RecipeDetails = () => {
  const [details, setDetails] = useState();
  const [nutrition, setNutrition] = useState();
  const [activeTab, setActiveTab] = useState("instructions");
  let params = useParams();

  const fetchDetails = async () => {
    const check = localStorage.getItem("details");
    if (check) {
      setDetails(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/${params.id}/information/?apiKey=${APIKEY}`,
        );
        localStorage.setItem("details", JSON.stringify(response.data));
        setDetails(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching recipes details");
      }
    }
  };
  const fetchNutrition = async () => {
    const check = localStorage.getItem("nutrition");
    if (check) {
      const parsedCheck = JSON.parse(check); // Parse the string to an object
      console.log(parsedCheck);
      const nutritionValues = {
        calories: parseFloat(parsedCheck.calories),
        carbs: parseFloat(parsedCheck.carbs.split("g")[0]),
        fat: parseFloat(parsedCheck.fat.split("g")[0]),
        protein: parseFloat(parsedCheck.protein.split("g")[0]),
      };
      setNutrition(nutritionValues); // Already an object, no need to parse
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/${params.id}/nutritionWidget.json?apiKey=${APIKEY}`,
        );
        localStorage.setItem("nutrition", JSON.stringify(response.data));
        setNutrition({
          calories: parseFloat(response.data.calories),
          carbs: parseFloat(response.data.carbs.split("g")[0]),
          fat: parseFloat(response.data.fat.split("g")[0]),
          protein: parseFloat(response.data.protein.split("g")[0]),
        });
      } catch (error) {
        console.error(error);
        toast.error("Error fetching recipes nutrition details");
      }
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchNutrition();
    console.log(nutrition);
  }, [params.id]);

  const isActive = (tab) => (activeTab === tab ? "bg-primary" : "bg-secondary");

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[80%] mx-auto mt-[10rem] mb-[10rem] p-4 shadow-lg rounded-lg bg-surface-dark"
    >
      {details && (
        <>
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">
                {details.title}
              </h2>

              <img
                src={details.image}
                alt={details.title}
                className="w-[20rem] h-[15rem] rounded-md"
              />
            </div>
            {activeTab === "instructions" && (
              <div className="w-[60%]">
                <h3 className="text-xl font-semibold text-white">
                  Instructions
                </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                  className="text-white text-justify"
                ></p>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div className="w-[60%]">
                <h3 className="text-xl font-semibold text-white">
                  Ingredients
                </h3>
                <ul>
                  {details.extendedIngredients.map((ingredient) => (
                    <li key={ingredient.id} className="text-white">
                      {ingredient.original}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="my-4">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                color={activeTab === "instructions" ? "green" : "gray"}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </Button>
              <Button
                color={activeTab === "ingredients" ? "green" : "gray"}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </Button>
            </div>
            {nutrition && (
              <>
                <p className="text-white mb-3">Nutrition per Serving</p>

                <div className="flex gap-10 items-center">
                  <CircleProgress
                    calories={nutrition.calories}
                    carbsProcent={parseInt(
                      (4 * nutrition.carbs * 100) / nutrition.calories,
                    )}
                    proteinProcent={parseInt(
                      (4 * nutrition.protein * 100) / nutrition.calories,
                    )}
                    fatProcent={parseInt(
                      (9 * nutrition.fat * 100) / nutrition.calories,
                    )}
                  />
                  <div className="flex flex-col items-center justify-center text-white">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#66b2b2" }}
                    >
                      {parseInt(
                        (4 * nutrition.carbs * 100) / nutrition.calories,
                      )}
                      %
                    </p>
                    <p>{nutrition.carbs}g</p>
                    <p className="text-xs">Carbs</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-white">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#7d12ff" }}
                    >
                      {parseInt((9 * nutrition.fat * 100) / nutrition.calories)}
                      %
                    </p>
                    <p>{nutrition.fat}g</p>
                    <p className="text-xs">Fat</p>
                  </div>
                  <div className="flex flex-col items-center justify-center text-white">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "#FF5F1F" }}
                    >
                      {parseInt(
                        (4 * nutrition.protein * 100) / nutrition.calories,
                      )}
                      %
                    </p>
                    <p>{nutrition.protein}g</p>
                    <p className="text-xs">Protein</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

const CircleProgress = ({
  calories,
  carbsProcent,
  proteinProcent,
  fatProcent,
}) => {
  const strokeWidth = 10;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  // Calculate the inverse percentages for stroke dash offsets
  const percentColors = {
    carbsProcent, // teal
    proteinProcent, // purple
    fatProcent, // orange
  };

  const offsetForCarbs =
    ((100 - percentColors.carbsProcent) / 100) * circumference;
  const offsetForProtein =
    offsetForCarbs +
    ((100 - percentColors.proteinProcent) / 100) * circumference;
  const offsetForFat =
    offsetForProtein + ((100 - percentColors.fatProcent) / 100) * circumference;

  // Make sure the circles are stacked in the correct order:
  // The first (bottom) circle should have the smallest offset,
  // and the last (top) circle should have the largest offset
  return (
    <div className="relative flex items-center justify-center">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#DDD"
          strokeWidth={strokeWidth - 2}
        />

        {/* Fat (Orange) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#FF5F1F"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForFat}
        />

        {/* Protein (Purple) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#7d12ff"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForProtein}
        />

        {/* Carbs (Teal) */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#66b2b2"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offsetForCarbs}
        />
      </svg>
      <span className="absolute text-lg font-semibold text-white">
        {calories} cal
      </span>
    </div>
  );
};

export default RecipeDetails;

// RecipeDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import { useUser } from "@/context/LoginRequired";
import RecipeDetailsComments from "./RecipeDetailsComments";

const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const parseRecipe = (recipeDetailsParsed) => {
  if (recipeDetailsParsed.includes("<li>")) {
    recipeDetailsParsed = recipeDetailsParsed.replace(/<\/?ol>/g, "");
    recipeDetailsParsed = recipeDetailsParsed.replace(/<li>/g, "");
    recipeDetailsParsed = recipeDetailsParsed
      .split("</li>")
      .filter((instruction) => instruction.trim() !== "");
  } else {
    recipeDetailsParsed = recipeDetailsParsed.split("\n");
  }
  return recipeDetailsParsed;
};
const RecipeDetails = () => {
  const currentUser = useUser();
  const [details, setDetails] = useState();
  const [nutrition, setNutrition] = useState();
  const [activeTab, setActiveTab] = useState("instructions");
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeComments, setRecipeComments] = useState([]);

  let params = useParams();

  const fetchDetails = async () => {
    const check = localStorage.getItem("details");
    if (check) {
      setDetails(JSON.parse(check));
      let recipeDetailsParsed = JSON.parse(check).instructions;
      recipeDetailsParsed = parseRecipe(recipeDetailsParsed);

      setRecipeInstructions(recipeDetailsParsed);
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/${params.id}/information/?apiKey=${APIKEY}`,
        );
        localStorage.setItem("details", JSON.stringify(response.data));
        const recipeDetailesParsed = parseRecipe(response.data.instructions);
        setRecipeInstructions(recipeDetailesParsed);
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
      const parsedCheck = JSON.parse(check);
      const nutritionValues = {
        calories: parseFloat(parsedCheck.calories),
        carbs: parseFloat(parsedCheck.carbs.split("g")[0]),
        fat: parseFloat(parsedCheck.fat.split("g")[0]),
        protein: parseFloat(parsedCheck.protein.split("g")[0]),
      };
      setNutrition(nutritionValues);
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
  const fetchRecipeComments = async () => {
    try {
      const response = await api.get(
        `https://localhost:7016/api/v1/RecipeComment/${params.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setRecipeComments(response.data.recipeComments);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching recipes comments");
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchNutrition();
    fetchRecipeComments();
  }, [params.id]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full md:w-[75%] 3xl:w-[60%]  mx-auto mt-[2rem] mb-[10rem] p-4 shadow-lg rounded-lg bg-surface-dark"
    >
      {details && (
        <div className="flex flex-col items-center">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div>
              <h2 className="text-base font-bold mb-4 text-white">
                {details.title}
              </h2>
              <img
                src={details.image}
                alt={details.title}
                className="w-[20rem] h-[15rem] rounded-md"
              />
            </div>
            {nutrition && (
              <div className="flex flex-col items-start gap-5">
                <div className="flex items-center justify-center">
                  <div>
                    <StarIcon className="text-yellow-700 cursor-pointer" />
                    <StarIcon className="text-yellow-700 cursor-pointer" />
                    <StarIcon className="text-yellow-700 cursor-pointer" />
                    <StarIcon className="text-yellow-700 cursor-pointer" />
                    <StarIcon className="text-yellow-700 cursor-pointer" />
                  </div>

                  <p className="text-white text-sm">(121 reviews)</p>
                </div>
                <div className="bg-surface-darkest p-5 rounded-md">
                  <p className="text-white mb-3">Nutrition per Serving</p>
                  <div className="flex gap-8 items-center ">
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
                        {parseInt(
                          (9 * nutrition.fat * 100) / nutrition.calories,
                        )}
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
                </div>
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
            {activeTab === "instructions" && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
              >
                <h3 className="text-xl mb-2 font-semibold text-white underline">
                  Instructions
                </h3>
                <div
                  className="w-[95%] mx-auto text-surface-light overflow-auto max-h-[20rem]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <ol
                    // dangerouslySetInnerHTML={{ __html: details.instructions }}
                    style={{ listStyleType: "decimal" }}
                    className="text-white text-justify pl-5"
                  >
                    {recipeInstructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
            {activeTab === "ingredients" && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto"
              >
                <h3 className="text-xl mb-2 font-semibold text-white underline">
                  Ingredients
                </h3>
                <div
                  className="w-[95%]  text-surface-light overflow-auto max-h-[20rem]"
                  style={{ scrollbarWidth: "none" }}
                >
                  <ul style={{ listStyleType: "disc" }} className="pl-5">
                    {details.extendedIngredients.map((ingredient, index) => (
                      <li key={index} className="text-white">
                        {ingredient.original}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
          <hr />
          <RecipeDetailsComments recipeId={params.id} />
        </div>
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

  const percentColors = {
    carbsProcent,
    proteinProcent,
    fatProcent,
  };

  const offsetForCarbs =
    ((100 - percentColors.carbsProcent) / 100) * circumference;
  const offsetForProtein =
    offsetForCarbs +
    ((100 - percentColors.proteinProcent) / 100) * circumference;
  const offsetForFat =
    offsetForProtein + ((100 - percentColors.fatProcent) / 100) * circumference;
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

// RecipeDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Button } from "@material-tailwind/react";
import StarIcon from "@mui/icons-material/Star";
import { useUser } from "@/context/LoginRequired";
import RecipeDetailsComments from "./RecipeDetailsComments";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu } from "@headlessui/react";
import tagStyles from "./tagStyles";
import CircleProgress from "./CircleProgress";
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

const activeMenuStyles = "bg-gray-100 text-gray-900";
const inactiveMenuStyles = "text-gray-700";
const menuStyles =
  "group flex rounded-md items-center w-full px-2 py-2 text-sm";
const RecipeDetails = () => {
  const currentUser = useUser();
  const [details, setDetails] = useState();
  const [nutrition, setNutrition] = useState();
  const [activeTab, setActiveTab] = useState("instructions");
  const [recipeInstructions, setRecipeInstructions] = useState([]);
  const [recipeTags, setRecipeTags] = useState([]);
  const [recipeComments, setRecipeComments] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(1);

  let params = useParams();

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal);
  };
  // const fetchImage = async () => {
  //   try {
  //     const response = await api.get(
  //       `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${params.id}&number=9`,
  //     );
  //     console.log(response.data.results);
  //     localStorage.setItem("searched", JSON.stringify(response.data.results));
  //     setSearchedRecipes(response.data.results);
  //   } catch (error) {
  //     toast.error("Error fetching recipes");
  //   }
  // }
  const fetchDetails = async () => {
    const check = localStorage.getItem("details");
    if (check) {
      setDetails(JSON.parse(check));

      let recipeDetailsParsed = JSON.parse(check).instructions;
      recipeDetailsParsed = parseRecipe(recipeDetailsParsed);
      setRecipeInstructions(recipeDetailsParsed);
      const tagsParsed = JSON.parse(check).dishTypes;
      if (tagsParsed.includes("antipasti")) {
        tagsParsed.splice(tagsParsed.indexOf("antipasti"), 1);
      }
      setRecipeTags(tagsParsed);
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/${params.id}/information/?apiKey=${APIKEY}`,
        );
        localStorage.setItem("details", JSON.stringify(response.data));
        const recipeDetailesParsed = parseRecipe(response.data.instructions);
        setRecipeInstructions(recipeDetailesParsed);
        setRecipeTags(response.data.dishTypes);
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

  const logFood = async () => {
    const isValidNumber = (value) =>
      !isNaN(parseFloat(value)) && isFinite(value) && value > 0;
    if (!selectedMeal) {
      toast.error("Please select a meal type by clicking on the 3 dots");
      return;
    }
    if (
      !details.title ||
      !isValidNumber(nutrition.calories) ||
      !isValidNumber(nutrition.fat) ||
      !isValidNumber(nutrition.carbs) ||
      !isValidNumber(nutrition.protein)
    ) {
      toast.error("Could not log recipe. Please try again later.");
      return;
    }
    try {
      const response = await api.post(
        `/api/v1/LoggedFood`,
        {
          userId: currentUser.userId,
          foodName: details.title,
          calories: nutrition.calories,
          protein: nutrition.protein,
          carbohydrates: nutrition.carbs,
          fat: nutrition.fat,
          mealType: selectedMeal,
          dateLogged: new Date().toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Recipe logged successfully");
      }
    } catch (error) {
      console.error("Error logging recipe:", error);
      toast.error("Error logging recipe");
    }
  };

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
          <div className="flex flex-col lg:flex-row gap-16 items-center">
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
                  <div className="flex items-center mt-2 ml-[50%]">
                    <Button
                      variant="gradient"
                      className=" rounded-full"
                      onClick={logFood}
                    >
                      Quick add
                    </Button>
                    <Menu as="div" className="relative inline-block text-left">
                      <Menu.Button>
                        <EllipsisVerticalIcon className="h-6 w-6 text-gray-900 cursor-pointer" />
                      </Menu.Button>
                      <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {[
                            { type: "Breakfast", value: 1 },
                            { type: "Lunch", value: 2 },
                            { type: "Dinner", value: 3 },
                            { type: "Snack", value: 4 },
                          ].map((meal, index) => (
                            <Menu.Item key={index}>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? activeMenuStyles
                                      : inactiveMenuStyles
                                  } ${menuStyles}`}
                                  onClick={() => handleSelectMeal(meal.value)}
                                >
                                  {meal.type}
                                </button>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Menu>
                  </div>
                  <div></div>
                </div>
              </div>
            )}
          </div>
          <div className="mx-auto mt-6 mb-3 flex flex-wrap gap-2">
            {recipeTags &&
              recipeTags.map((tag, index) => {
                const style = tagStyles[index % tagStyles.length];
                return (
                  <span
                    key={index}
                    className={`${style.bg} ${style.text} text-sm font-medium me-2 px-2.5 py-0.5 rounded-full ${style.darkBg} ${style.darkText}`}
                  >
                    {tag}
                  </span>
                );
              })}
          </div>

          <div className="my-4 w-full">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant="gradient"
                color={activeTab === "instructions" ? "green" : "gray"}
                onClick={() => setActiveTab("instructions")}
              >
                Instructions
              </Button>
              <Button
                variant="gradient"
                color={activeTab === "ingredients" ? "green" : "gray"}
                onClick={() => setActiveTab("ingredients")}
              >
                Ingredients
              </Button>
            </div>
            <div className="flex items-start w-full mx-5">
              {activeTab === "instructions" && (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl mb-2 font-semibold text-white underline">
                    Instructions
                  </h3>
                  <div
                    className="w-[95%] mx-auto text-surface-light overflow-auto max-h-[20rem]"
                    style={{ scrollbarWidth: "none" }}
                  >
                    <ol
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
          </div>
          <hr />
          <RecipeDetailsComments recipeId={params.id} />
        </div>
      )}
    </motion.div>
  );
};
export default RecipeDetails;

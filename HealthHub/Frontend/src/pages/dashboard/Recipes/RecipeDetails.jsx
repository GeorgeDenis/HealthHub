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
      // try {
      //   const response = await api.get(
      //     `https://api.spoonacular.com/recipes/${params.id}/information/?apiKey=${APIKEY}`,
      //   );
      //   localStorage.setItem("details", JSON.stringify(response.data));
      //   setDetails(response.data);
      // } catch (error) {
      //   console.log(error);
      //   toast.error("Error fetching recipes details");
      // }
    }
  };
  const fetchNutrition = async () => {
    const check = localStorage.getItem("nutrition");
    if (check) {
      setNutrition(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/${params.id}/nutritionWidget.json?apiKey=${APIKEY}`,
        );
        localStorage.setItem("nutrition", JSON.stringify(response.data));
        setNutrition(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching recipes nutrition details");
      }
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchNutrition();
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
          <div className="my-4">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                color={isActive("instructions") ? "green" : "gray"}
                onClick={() => setActiveTab("instructions")}
                ripple="light"
              >
                Instructions
              </Button>
              <Button
                color={isActive("ingredients") ? "green" : "gray"}
                onClick={() => setActiveTab("ingredients")}
                ripple="light"
              >
                Ingredients
              </Button>
            </div>
            <div>
              <p>Calories: {nutrition.calories}</p>
              <p>Fat: {nutrition.fat}</p>
              <p>Protein: {nutrition.protein}</p>
              <p>Carbs: {nutrition.carbs}</p>
            </div>
            {activeTab === "instructions" && (
              <div className="prose">
                <p
                  dangerouslySetInnerHTML={{ __html: details.instructions }}
                  className="text-white"
                ></p>
              </div>
            )}
            {activeTab === "ingredients" && (
              <div className="prose">
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
        </>
      )}
    </motion.div>
  );
};

export default RecipeDetails;

import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const HighCarbsRecipes = () => {
  const [highCarbs, setHighCarbs] = useState([]);
  useEffect(() => {
    getHighCarbs();
  }, []);

  const getHighCarbs = async () => {
    const check = localStorage.getItem("highCarbs");
    if (check) {
      setHighCarbs(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/findByNutrients?apiKey=${APIKEY}&minCarbs=30&number=7`,
        );
        const carbsArray = response.data.filter(
          (recipe) => recipe.id !== 157219,
        );
        localStorage.setItem("highCarbs", JSON.stringify(carbsArray));
        setHighCarbs(response.data);
      } catch (error) {
        toast.error("Error fetching high in carbs recipes");
      }
    }
  };
  return (
    <div>
      <div className="mx-[2rem] my-0">
        <Typography
          variant="h4"
          className=" text-white font-medium mt-4 mb-2 text-center p-2 border-y-green-600 border-y-2"
        >
          High in carbohydrates
        </Typography>
        <Splide
          options={{
            perPage: 3,
            arrow: false,
            pagination: false,
            drag: "free",
            gap: "3rem",
            breakpoints: {
              640: {
                perPage: 1,
              },
              768: {
                perPage: 2,
              },
              1024: {
                perPage: 3,
              },
            },
          }}
        >
          {highCarbs.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <div className="min-h-[15rem] min-w-[10rem] rounded-2xl overflow-hidden relative transition-transform transform hover:scale-105">
                <Link
                  to={`/dashboard/recipes/details/${recipe.id}`}
                  className="block"
                >
                  <img
                    className="w-full h-56 object-cover rounded-t-2xl"
                    src={recipe.image}
                  />
                  <div className="bg-gray-900 text-white font-semibold text-xs md:text-sm px-2 py-2 text-center rounded-b-2xl">
                    {recipe.title}
                  </div>
                </Link>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};
const Gradient = () => {
  return <div className="absolute z-3 w-full h-full gradient-bg"></div>;
};

export default HighCarbsRecipes;

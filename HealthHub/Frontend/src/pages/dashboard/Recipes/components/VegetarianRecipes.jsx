import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";

const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const VegetarianRecipes = () => {
  const [vegetarian, setVegetarian] = useState([]);
  useEffect(() => {
    getVegetarian();
  }, []);

  const getVegetarian = async () => {
    const check = localStorage.getItem("vegetarian");
    if (check) {
      setVegetarian(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9&tags=vegetarian`,
        );
        localStorage.setItem(
          "vegetarian",
          JSON.stringify(response.data.recipes),
        );
        setVegetarian(response.data.recipes);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching vegetarian recipes");
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
          Vegetarian Picks
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
          {vegetarian.map((recipe) => (
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
export default VegetarianRecipes;

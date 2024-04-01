import React, { useEffect, useState } from "react";
import api from "../../../../services/api";
import { toast } from "react-toastify";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { Link } from "react-router-dom";
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const PopularRecipes = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://api.spoonacular.com/recipes/random?apiKey=${APIKEY}&number=9`,
        );
        localStorage.setItem("popular", JSON.stringify(response.data.recipes));
        setPopular(response.data.recipes);
      } catch (error) {
        toast.error("Error fetching popular recipes");
      }
    }
  };
  return (
    <div>
      <div className="mx-[2rem] my-0">
        <h3 className="text-white">Popular Picks</h3>
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
          {popular.map((recipe) => (
            <SplideSlide key={recipe.id}>
              <div className="min-h-[15rem] rounded-2xl overflow-hidden relative">
                <Link to={`/dashboard/recipes/details/${recipe.id}`}>
                  <p className="absolute z-10 left-1/2 bottom-0 -translate-x-1/2 text-white w-full text-center font-semibold text-base h-2/5 flex justify-center items-center">
                    {recipe.title}
                  </p>
                  <img
                    className="absolute left-0 w-full h-full object-cover rounded-2xl"
                    src={recipe.image}
                    alt={recipe.title}
                  />
                  <Gradient />
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

export default PopularRecipes;

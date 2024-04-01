import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import Category from "./components/Category";
import SearchRecipe from "./components/SearchRecipe";
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const check = localStorage.getItem(params.type);
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      try {
        console.log(name);
        const response = await api.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&cuisine=${name}&number=3`,
        );
        localStorage.setItem(
          params.type,
          JSON.stringify(response.data.results),
        );
        setCuisine(response.data.results);
      } catch (error) {
        toast.error("Error fetching recipes");
      }
    }
  };
  useEffect(() => {
    getCuisine(params.type);
    //console.log(params);
  }, [params.type]);
  return (
    <div className="flex flex-col">
      <SearchRecipe />

      <Category />
      <Grid>
        {cuisine.map((item) => {
          return (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="min-h-[20rem] rounded-2xl overflow-hidden relative"
            >
              <Link to={`/dashboard/recipes/details/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <h4 className="absolute z-10 left-1/2 bottom-0 -translate-x-1/2 text-white w-full text-center font-semibold text-base h-2/5 flex justify-center items-center">
                  {item.title}
                </h4>
              </Link>
            </motion.div>
          );
        })}
      </Grid>
    </div>
  );
};
const Grid = ({ children }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-12">
      {children}
    </div>
  );
};

export default Cuisine;

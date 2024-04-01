import React, { useState, useEffect } from "react";
import Category from "./components/Category";
import { useParams, Link } from "react-router-dom";
import api from "../../../services/api";
import { toast } from "react-toastify";
import SearchRecipe from "./components/SearchRecipe";
const APIKEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
import { motion } from "framer-motion";
const SearchedRecipe = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();
  const getSearchedRecipe = async (name) => {
    const check = localStorage.getItem("searched");
    if (check) {
      setSearchedRecipes(JSON.parse(check));
    } else {
      // try {
      //   console.log(name);
      //   const response = await api.get(
      //     `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&query=${name}&number=3`,
      //   );
      //   console.log(response.data.results);
      //   localStorage.setItem("searched", JSON.stringify(response.data.results));
      //   setSearchedRecipes(response.data.results);
      // } catch (error) {
      //   toast.error("Error fetching recipes");
      // }
    }
  };
  useEffect(() => {
    getSearchedRecipe(params.query);
  }, [params.query]);
  return (
    <div className="w-full flex flex-col items-center">
      <SearchRecipe />
      <Category />
      <Grid>
        {searchedRecipes.map((item) => {
          return (
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={item.id}
              className="min-h-[20rem] w-[17rem] rounded-xl overflow-hidden relative"
            >
              <Link to={`/dashboard/recipes/details/${item.id}`}>
                <img
                  src={item.image}
                  alt="recipe"
                  className="w-[17rem] h-[15rem] object-cover rounded-2xl"
                />
                <h1 className="text-white text-base">{item.title}</h1>
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
    <motion.div className="flex items-center gap-10 flex-wrap">
      {children}
    </motion.div>
  );
};
export default SearchedRecipe;

import React from "react";
import Recipes from "./Recipes";
import Category from "./components/Category";
import SearchRecipe from "./components/SearchRecipe";
const RecipesPages = () => {
  return (
    <div className="flex flex-col justify-center">
      <SearchRecipe />
      <Category />
      <Recipes />
    </div>
  );
};

export default RecipesPages;

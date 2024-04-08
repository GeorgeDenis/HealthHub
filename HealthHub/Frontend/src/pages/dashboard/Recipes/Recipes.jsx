import React from "react";
import VegetarianRecipes from "./components/VegetarianRecipes";
import PopularRecipes from "./components/PopularRecipes";
import { motion } from "framer-motion";
import HighProteinRecipes from "./components/HighProteinRecipes";
import LowFatRecipes from "./components/LowFatRecipes";
import HighCarbsRecipes from "./components/HighCarbsRecipes";
const Recipes = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PopularRecipes />
      <VegetarianRecipes />
      <HighProteinRecipes />
      <HighCarbsRecipes />
      <LowFatRecipes />
    </motion.div>
  );
};

export default Recipes;

import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import { NavLink } from "react-router-dom";

const Category = () => {
  return (
    <div className="flex justify-center mb-3">
      <NavLink
        to={"/dashboard/recipes/cuisine/Italian"}
        className={({ isActive }) =>
          isActive ? "cuisine-navlink text-red-500" : "cuisine-navlink text-white"
        }
      >
        <FaPizzaSlice className="text-lg" />
        <h4 className="text-xs">Italian</h4>
      </NavLink>
      <NavLink
        to={"/dashboard/recipes/cuisine/American"}
        className={({ isActive }) =>
          isActive ? "cuisine-navlink text-red-500" : "cuisine-navlink text-white"
        }
      >
        <FaHamburger className="text-lg" />
        <h4 className="text-xs">American</h4>
      </NavLink>
      <NavLink
        to={"/dashboard/recipes/cuisine/Thai"}
        className={({ isActive }) =>
          isActive ? "cuisine-navlink text-red-500" : "cuisine-navlink text-white"
        }
      >
        <GiNoodles className="text-lg" />
        <h4 className="text-xs">Thai</h4>
      </NavLink>
      <NavLink
        to={"/dashboard/recipes/cuisine/Chinese"}
        className={({ isActive }) =>
          isActive ? "cuisine-navlink text-red-500" : "cuisine-navlink text-white"
        }
      >
        <GiChopsticks className="text-lg" />
        <h4 className="text-xs">Japanese</h4>
      </NavLink>
    </div>
  );
};

export default Category;

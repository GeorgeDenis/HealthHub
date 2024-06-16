import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {useNavigate} from "react-router-dom";
const SearchRecipe = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/dashboard/recipes/search/${input}`);
  };
  return (
    <form className="flex items-center mx-auto mb-10 gap-2" onSubmit={submitHandler}>
      <input className="rounded-xl w-[20rem] h-10 p-2" type="text" placeholder="Search for a recipe" value={input} onChange={handleInput}/>
      <FaSearch className=" top-3 left-3 text-gray-400" />
    </form>
  );
};

export default SearchRecipe;

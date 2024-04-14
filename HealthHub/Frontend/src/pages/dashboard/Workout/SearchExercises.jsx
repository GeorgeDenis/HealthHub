import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { toast } from "react-toastify";
import api from "../../../services/api";
import HorizontalScrollbar from "./components/HorizontalScrollbar";
import { options } from "./components/options";

const SearchExercises = ({ setExercises }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async () => {
    if (!search) {
      toast.error("Please enter a valid exercise name");
      return;
    }
    const check = localStorage.getItem("exercises");
    if (check) {
      const response = JSON.parse(check);
      console.log("check", response);
      setSearch("");
      setExercises(response);
    } else {
      try {
        const response = await api.get(
          `https://exercisedb.p.rapidapi.com/exercises/name/${search}`,
          options,
        );
        localStorage.setItem("exercises", JSON.stringify(response.data));
        console.log("not check", response.data);

        setSearch("");
        setExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Error fetching exercises");
      }
    }
  };
  return (
    <Stack
      className="w-full"
      alignItems="center"
      mt="37px"
      justifyContent="center"
      p="20px"
    >
      <div className="flex items-center flex-col gap-5">
        {/* <Typography variant="h4" className="text-center h-10 text-white">
          Search Exercises
        </Typography> */}
        <div className="flex">
          <input
            className="rounded-lg rounded-r-none w-[240px] md:w-[440px] bg-white text-center h-10 flex items-center justify-center"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            placeholder="Search Exercises"
            type="text"
          />
          <button
            className="rounded-lg rounded-l-none h-10 bg-green-700 p-3 text-white hover:bg-green-800 flex items-center"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </Stack>
  );
};

export default SearchExercises;

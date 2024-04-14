import React, { useState, useEffect } from "react";
import { Typography, Card } from "@material-tailwind/react";
import SearchExercises from "./SearchExercises";
import Exercises from "./Exercises";
import HorizontalScrollbar from "./components/HorizontalScrollbar";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { options } from "./options";

const Workout = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  useEffect(() => {
    fetchExerciseData();
  }, []);
  const fetchExerciseData = async () => {
    const check = localStorage.getItem("bodyParts");
    if (check) {
      setBodyParts(JSON.parse(check));
    } else {
      try {
        const response = await api.get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPartList`,
          options,
        );
        console.log(response.data);
        localStorage.setItem("bodyParts", JSON.stringify(response.data));

        setBodyParts([...response.data]);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Error fetching exercises");
      }
    }
  };
  const handleBodyPartChange = async (item) => {
    const check = localStorage.getItem("bodyPartsExercises");
    if (check) {
      setExercises(JSON.parse(check));

    } else {
      try {
        const response = await api.get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${item}`,
          options,
        );
        console.log(response.data);
        localStorage.setItem(
          "bodyPartsExercises",
          JSON.stringify(response.data),
        );

        setExercises([...response.data]);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        toast.error("Error fetching exercises");
      }
    }
  };
  return (
    <div className=" text-surface-light">
      <div
        className="relative mt-8 h-72 w-full overflow-hidden rounded-xl "
        style={{
          backgroundImage: "url('../../../public/img/banner2.jpg')",
          backgroundPosition: "center 43%",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 h-full w-full" />
      </div>
      <Card className="mx-3 -mt-32 md:-mt-28 mb-6 lg:mx-4 bg-surface-darkest flex flex-col items-center justify-center p-4">
        <SearchExercises setExercises={setExercises} />
        {bodyParts && (
          <HorizontalScrollbar
            data={bodyParts}
            bodyParts
            handleBodyPartChange={handleBodyPartChange}
            bodyPart={bodyPart}
          />
        )}
        <Exercises setExercises={setExercises} exercises={exercises} />
      </Card>
    </div>
  );
};

export default Workout;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ExerciseVideos from "./components/ExerciseVideos";
import SimiliarExercises from "./components/SimiliarExercises";
import Details from "./components/Details";
import { toast } from "react-toastify";
import api from "../../../../services/api";
import { options } from "../components/options";
import { youtubeOptions } from "../components/options";
const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
const youtubeSearchUrl = "https://youtube-search-and-download.p.rapidapi.com";

const ExerciseDetails = () => {
  const { id } = useParams();
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [similiarExercises, setSimiliarExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);

  useEffect(() => {
    fetchExerciseDetail();
  }, [id]);

  const fetchExerciseDetail = async () => {
    const check = localStorage.getItem("exerciseDetail");
    if (check) {
      setExerciseDetail(JSON.parse(check));
      fetchExerciseVideos(JSON.parse(check).name);
      fetchSimilarExercises(JSON.parse(check).target);
      fetchEquipmentExercises(JSON.parse(check).equipment);
      return;
    } else {
      try {
        const response = await api.get(
          `${exerciseDbUrl}/exercises/exercise/${id}`,
          options,
        );
        setExerciseDetail(response.data);
        fetchExerciseVideos(response.data.name);
        fetchSimilarExercises(response.data.target);
        fetchEquipmentExercises(response.data.equipment);

        localStorage.setItem("exerciseDetail", JSON.stringify(response.data));
      } catch (error) {
        toast.error("Failed to fetch exercise details");
      }
    }
  };

  const fetchExerciseVideos = async (name) => {
    const check = localStorage.getItem("exerciseVideos");
    if (check) {
      setExerciseVideos(JSON.parse(check));
      return;
    } else {
      try {
        const response = await api.get(
          `${youtubeSearchUrl}/search?query=${name} exercise`,
          youtubeOptions,
        );
        setExerciseVideos(response.data.contents);
        console.log("exerciseVideos", response.data);
        localStorage.setItem(
          "exerciseVideos",
          JSON.stringify(response.data.contents),
        );
      } catch (error) {
        toast.error("Failed to fetch exercise videos");
      }
    }
  };
  const fetchSimilarExercises = async (target) => {
    const check = localStorage.getItem("similarExercises");
    if (check) {
      setSimiliarExercises(JSON.parse(check));
      return;
    } else {
      try {
        const response = await api.get(
          `${exerciseDbUrl}/exercises/target/${target}`,
          options,
        );
        setSimiliarExercises(response.data);
        localStorage.setItem("similarExercises", JSON.stringify(response.data));
      } catch (error) {
        toast.error("Failed to fetch similar exercises");
      }
    }
  };
  const fetchEquipmentExercises = async (equipment) => {
    const check = localStorage.getItem("equipmentExercises");
    if (check) {
      setEquipmentExercises(JSON.parse(check));
      return;
    } else {
      try {
        const response = await api.get(
          `${exerciseDbUrl}/exercises/equipment/${equipment}`,
          options,
        );
        setEquipmentExercises(response.data);
        localStorage.setItem(
          "equipmentExercises",
          JSON.stringify(response.data),
        );
      } catch (error) {
        toast.error("Failed to fetch similar equipment exercises");
      }
    }
  };
  return (
    <Box>
      <Details exerciseDetail={exerciseDetail} />
      <ExerciseVideos
        exerciseVideos={exerciseVideos}
        name={exerciseDetail.name}
      />
      <SimiliarExercises
        targetMuscleExercises={similiarExercises}
        equipmentExercises={equipmentExercises}
      />
    </Box>
  );
};

export default ExerciseDetails;

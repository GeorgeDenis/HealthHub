import React, { useState, useEffect } from "react";
import { useUser } from "@/context/LoginRequired";
import { CardContent, Modal } from "@mui/material";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewStrengthExerciseModal from "./NewStrengthExerciseModal";

const AddStrengthExerciseModal = ({
  isStrengthExerciseModalOpen,
  handleCloseStrengthExerciseModal,
}) => {
  const currentUser = useUser();
  const [searchText, setSearchText] = useState("");
  const [recentStrengthExercises, setRecentStrengthExercises] = useState([]);
  const [strengthExercises, setStrengthExercises] = useState([]);
  const [searchingSection, setSearchingSection] = useState("");
  const [currentExercise, setCurrentExercise] = useState({});

  const [isSearching, setIsSearching] = useState(false);
  const [isNewStrengthExerciseModalOpen, setIsNewStrengthExerciseModalOpen] =
    useState(false);

  useEffect(() => {
    setStrengthExercises([]);
    setRecentStrengthExercises([]);
    setSearchingSection("history");
    setIsSearching(false);
    fetchRecentStrengthExercises();
  }, [isStrengthExerciseModalOpen]);

  useEffect(() => {
    if (currentExercise.exerciseName && currentExercise.muscle) {
      handleOpenNewStrengthExerciseModalOpen();
    }
  }, [currentExercise]);

  const fetchRecentStrengthExercises = async () => {
    try {
      const response = await api.get(
        `api/v1/LoggedStrengthExercise/get-recent?userId=${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setRecentStrengthExercises(response.data.loggedStrengthExercises);
      } else {
        toast.error("No exercises found");
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };
  const handleSearchStrengthExercise = async () => {
    setStrengthExercises([]);
    if (searchText === "") {
      toast.error("Please enter a search term");
      return;
    }
    setIsSearching(true);
    try {
      const response = await api.get(
        `api/v1/LoggedStrengthExercise/search-strength-exercise?muscleName=${searchText}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setStrengthExercises(response.data);
        setSearchText("");
      } else {
        toast.error("No exercises found");
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    } finally {
      setIsSearching(false);
      setSearchText("");
    }
  };

  const handleOpenNewStrengthExerciseModalOpen = () => {
    setIsNewStrengthExerciseModalOpen(true);
  };
  const handleCloseNewStrengthExerciseModal = () => {
    setIsNewStrengthExerciseModalOpen(false);
    fetchRecentStrengthExercises();
  };
  const handleSetCurrentExercise = (exerciseName, muscle) => {
    if (exerciseName === "" || muscle === "") {
      toast.error("Please select a valid exercise");
      return;
    }
    setCurrentExercise({ exerciseName, muscle });
  };
  const handleAddNewExercise = () => {
    setCurrentExercise({ exerciseName: "", muscle: "" });
    handleOpenNewStrengthExerciseModalOpen();
  };

  return (
    <>
      <Modal
        open={isStrengthExerciseModalOpen}
        onClose={handleCloseStrengthExerciseModal}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[29rem] md:w-[25rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div>
            {searchingSection === "history" && (
              <Input
                label="Search"
                color="green"
                crossOrigin={undefined}
                className="text-white w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                icon={
                  <i
                    className="fa-solid fa-search cursor-pointer"
                    // onClick={() => handleSearchRecentExercise()}
                  />
                }
              />
            )}
            {searchingSection === "exercises" && (
              <Input
                label="Search"
                color="green"
                crossOrigin={undefined}
                className="text-white w-full"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                icon={
                  <i
                    className="fa-solid fa-search cursor-pointer"
                    onClick={() => handleSearchStrengthExercise()}
                  />
                }
              />
            )}
            <div className="mt-3 flex justify-around items-center">
              <p
                className="text-surface-light cursor-pointer font-semibold p-2"
                style={{
                  textDecoration:
                    searchingSection === "history" ? "underline" : "none",
                  color: searchingSection === "history" ? "#4cbb17" : "white",
                }}
                onClick={() => setSearchingSection("history")}
              >
                History
              </p>
              <p
                className="text-surface-light cursor-pointer font-semibold p-2"
                style={{
                  textDecoration:
                    searchingSection === "exercises" ? "underline" : "none",
                  color: searchingSection === "exercises" ? "#4cbb17" : "white",
                }}
                onClick={() => setSearchingSection("exercises")}
              >
                All exercises
              </p>
            </div>
            <hr />
          </div>
          <div
            className="mt-4 flex flex-col gap-3 selection:text-surface-light overflow-auto max-h-[17rem]"
            style={{ scrollbarWidth: "none" }}
          >
            {recentStrengthExercises.length > 0 &&
              searchingSection === "history" &&
              recentStrengthExercises.map((exercise, index) => (
                <CardContent
                  key={index}
                  className="flex  p-2 bg-green-900 rounded-lg hover:bg-primary cursor-pointer duration-200"
                  onClick={() =>
                    handleSetCurrentExercise(
                      exercise.name,
                      exercise.muscleGroup,
                    )
                  }
                >
                  <div className="flex gap-2 w-full justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <p className="text-surface-light text-sm font-semibold">
                        {exercise.name}
                      </p>
                      <p className="text-surface-light text-sm">
                        {exercise.muscleGroup}
                      </p>
                    </div>
                    <div>
                      {index % 2 === 0 && <p className="text-lg">🏋️‍♂️</p>}
                      {index % 2 !== 0 && <p className="text-lg">🤸🏻‍♂️</p>}
                    </div>
                  </div>
                </CardContent>
              ))}

            {strengthExercises.length > 0 &&
              searchingSection === "exercises" &&
              strengthExercises.map((exercise, index) => (
                <CardContent
                  key={index}
                  className="flex  p-2 bg-green-900 rounded-lg hover:bg-primary cursor-pointer duration-200"
                  onClick={() =>
                    handleSetCurrentExercise(
                      exercise.name,
                      exercise.muscle,
                    )
                  }
                >
                  <div className="flex gap-2 w-full justify-between items-center">
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-surface-light text-sm font-semibold">
                          {exercise.name}
                        </p>
                      </div>
                      <p className="text-surface-light text-sm">
                        {exercise.muscle}
                      </p>
                    </div>
                    <div>
                      {index % 2 === 0 && <p className="text-lg">💪🏼</p>}
                      {index % 2 !== 0 && <p className="text-lg">🚴🏻</p>}
                    </div>
                    {/* <Menu>
                      <MenuHandler>
                        <i className="fa-solid fa-ellipsis-v cursor-pointer" />
                      </MenuHandler>
                      <MenuList>
                        <MenuItem color="green">Add to log</MenuItem>
                      </MenuList>
                    </Menu> */}
                  </div>
                </CardContent>
              ))}
            {strengthExercises.length === 0 &&
              searchingSection === "exercises" &&
              !isSearching && (
                <CardContent className=" bg-green-900 rounded-lg flex flex-col justify-center items-center">
                  <p className="text-gray-500 text-sm">No exercises found.</p>
                  <p className="text-gray-500 text-sm">
                    Try searching for something else!
                  </p>
                </CardContent>
              )}
          </div>
          {searchingSection === "history" && (
            <button
              className=" flex justify-center items-center mt-5 mx-auto h-8 bg-secondary hover:bg-primary duration-200 rounded-lg p-2 text-surface-light font-semibold"
              onClick={() => handleAddNewExercise()}
            >
              Add a New Exercise
            </button>
          )}

          {isSearching && (
            <div className={"flex justify-center my-48"}>
              <Spinner className={"h-8 w-8"} />
            </div>
          )}
        </div>
      </Modal>
      <NewStrengthExerciseModal
        isNewStrengthExerciseModalOpen={isNewStrengthExerciseModalOpen}
        handleCloseNewStrengthExerciseModal={
          handleCloseNewStrengthExerciseModal
        }
        exerciseName={currentExercise.exerciseName}
        muscle={currentExercise.muscle}
      />
    </>
  );
};

export default AddStrengthExerciseModal;

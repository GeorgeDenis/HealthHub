import React, { useState, useEffect } from "react";
import { useUser } from "@/context/LoginRequired";
import { CardContent, Modal } from "@mui/material";
import api from "../../../../../services/api";
import { toast } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewCardioExerciseModal from "./NewCardioExerciseModal";

const AddCardioExerciseModal = ({
  isCardioExerciseModalOpen,
  handleCloseCardioExerciseModal,
  fetchLoggedCardioExercises,
  selectedDate,
}) => {
  const currentUser = useUser();
  const [searchText, setSearchText] = useState("");
  const [recentCardioExercises, setRecentCardioExercises] = useState([]);
  const [cardioExercises, setCardioExercises] = useState([]);
  const [searchingSection, setSearchingSection] = useState("");
  const [currentExercise, setCurrentExercise] = useState({});

  const [isSearching, setIsSearching] = useState(false);
  const [isNewCardioExerciseModalOpen, setIsNewCardioExerciseModalOpen] =
    useState(false);

  useEffect(() => {
    setCardioExercises([]);
    setRecentCardioExercises([]);
    setSearchingSection("history");
    setIsSearching(false);
    fetchRecentCardioExercises();
  }, [isCardioExerciseModalOpen]);

  useEffect(() => {
    if (
      currentExercise.exerciseName &&
      currentExercise.calories_per_hour >= 0
    ) {
      handleOpenNewCardioExerciseModalOpen();
    }
  }, [currentExercise]);

  useEffect(() => {
    fetchLoggedCardioExercises();
  }, [isNewCardioExerciseModalOpen]);

  const fetchRecentCardioExercises = async () => {
    try {
      const response = await api.get(
        `api/v1/LoggedCardioExercise/get-recent?userId=${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setRecentCardioExercises(response.data.loggedCardioExercises);
      } else {
        toast.error("No exercises found");
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };
  const handleSearchCardioExercise = async () => {
    setCardioExercises([]);
    if (searchText === "") {
      toast.error("Please enter a search term");
      return;
    }
    setIsSearching(true);
    try {
      const response = await api.get(
        `api/v1/LoggedCardioExercise/search-cardio-exercise/`,
        {
          params: { exerciseName: searchText },
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        setCardioExercises(response.data);
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
  const handleOpenNewCardioExerciseModalOpen = () => {
    setIsNewCardioExerciseModalOpen(true);
  };
  const handleCloseNewCardioExerciseModal = () => {
    setIsNewCardioExerciseModalOpen(false);
    fetchRecentCardioExercises();
  };
  const handleSetCurrentExercise = (exerciseName, calories_per_hour) => {
    if (exerciseName === "" || calories_per_hour === "") {
      toast.error("Please select a valid exercise");
      return;
    }
    setCurrentExercise({ exerciseName, calories_per_hour });
  };
  const handleAddNewExercise = () => {
    setCurrentExercise({ exerciseName: "", muscle: "" });
    handleOpenNewCardioExerciseModalOpen();
  };

  return (
    <>
      <Modal
        open={isCardioExerciseModalOpen}
        onClose={handleCloseCardioExerciseModal}
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
                    onClick={() => handleSearchCardioExercise()}
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
            {recentCardioExercises.length > 0 &&
              searchingSection === "history" &&
              recentCardioExercises.map((exercise, index) => (
                <CardContent
                  key={index}
                  className="flex  p-2 bg-green-900 rounded-lg hover:bg-primary cursor-pointer duration-200"
                  onClick={() => handleSetCurrentExercise(exercise.name, 0)}
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

            {cardioExercises.length > 0 &&
              searchingSection === "exercises" &&
              cardioExercises.map((exercise, index) => (
                <CardContent
                  key={index}
                  className="flex  p-2 bg-green-900 rounded-lg hover:bg-primary cursor-pointer duration-200"
                  onClick={() =>
                    handleSetCurrentExercise(
                      exercise.name,
                      exercise.calories_per_hour,
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
                      <p className="text-gray-500 text-sm">
                        Calories burned per hour: {exercise.calories_per_hour}
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
            {cardioExercises.length === 0 &&
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
      <NewCardioExerciseModal
        isNewCardioExerciseModalOpen={isNewCardioExerciseModalOpen}
        handleCloseNewCardioExerciseModal={handleCloseNewCardioExerciseModal}
        exerciseName={currentExercise.exerciseName}
        calories_per_hour={currentExercise.calories_per_hour}
        selectedDate={selectedDate}
      />
    </>
  );
};

export default AddCardioExerciseModal;

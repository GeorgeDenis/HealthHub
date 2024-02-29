import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { countries } from "countries-list";

const MainInfoCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedActivity, selectedGoal, selectedWeeklyGoal } =
    location.state || {};
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [userData, setUserData] = useState({
    height: "",
    dateOfBirth: "",
    location: "",
    gender: "",
    goalType: "",
    weeklyGoal: "",
    activity: "",
    currentWeight: "",
  });

  useEffect(() => {
    if (!selectedActivity || !selectedGoal || !selectedWeeklyGoal) {
      navigate("/auth/sign-in");
    }
    setUserData((prevUserData) => ({
      ...prevUserData,
      activity: selectedActivity,
      goalType: selectedGoal,
      weeklyGoal: selectedWeeklyGoal,
    }));
  }, []);

  const countryOptions = Object.values(countries)
    .map((country) => ({
      name: country.name,
      code: country.iso2,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  const handleDataChange = (value, type) => {
    setUserData((prevUserData) => ({ ...prevUserData, [type]: value }));
  };

  const handleBack = () => {
    navigate("/auth/set-activity-level",{state: {selectedGoal, selectedWeeklyGoal}});
  };

  const handleNext = () => {
    if (!parseInt(userData.height)) {
      toast.error("Height must be a number");
      return;
    }
    if (!parseInt(userData.currentWeight)) {
      toast.error("Current weight must be a number");
      return;
    }
    if (
      !userData.dateOfBirth ||
      !userData.location ||
      !userData.gender ||
      !userData.height ||
      !userData.currentWeight
    ) {
      toast.error("Please fill in all the fields");
      return;
    }

    const today = new Date();
    const birthDate = new Date(userData.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      toast.error("You must be 18 years or older to use this app");
      return;
    }

    const convertedGender =
      userData.gender === "male" ? 1 : userData.gender === "female" ? 2 : 0;
    const convertedWeight = parseInt(userData.currentWeight);
    const convertedHeight = parseInt(userData.height);

    const updatedUserData = {
      ...userData,
      gender: convertedGender,
      currentWeight: convertedWeight,
      height: convertedHeight,
    };

    navigate("/auth/sign-up", { state: { userData: updatedUserData } });
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[20rem] md:w-[27rem] bg-surface-dark shadow-lg p-4 rounded flex flex-col">
      <div>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden p-1">
          <div className="relative h-6 flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[80%] bg-surface-mid "></div>
            <div className="relative text-black-700 font-medium text-sm">
              80%
            </div>
          </div>
        </div>
        <Typography variant="h5" className="text-surface-light">
          What's your gender?
        </Typography>
        <Select
          value={userData.gender}
          onChange={(value) => handleDataChange(value, "gender")}
          className=" text-surface-light focus:!border-secondary select-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          placeholder="Select Gender"
        >
          {genderOptions.map((option) => (
            <Option
              key={option.value}
              value={option.value}
              className="text-surface-mid-light"
            >
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-2">
        <Typography variant="h5" className="text-surface-light">
          How tall are you?
        </Typography>
        <Input
          type={"text"}
          label={"Height"}
          color={"green"}
          className={"text-surface-light"}
          value={userData.height || ""}
          crossOrigin={undefined}
          onChange={(e) => handleDataChange(e.target.value, "height")}
        />
      </div>
      <div className="mt-2">
        <Typography variant="h5" className="text-surface-light">
          What's your current weight?
        </Typography>
        <Input
          type={"text"}
          label={"Weight"}
          color={"green"}
          className={"text-surface-light"}
          value={userData.currentWeight || ""}
          crossOrigin={undefined}
          onChange={(e) => handleDataChange(e.target.value, "currentWeight")}
        />
      </div>
      <div className="flex flex-col justify-between mt-2">
        <Typography variant="h5" className="text-surface-light">
          When were you born?
        </Typography>
        <DatePicker
          placeholderText="03/08/2000"
          onChange={(date) =>
            handleDataChange(date.toISOString(), "dateOfBirth")
          }
          selected={userData.dateOfBirth || ""}
          wrapperClassName="bg-surface-darkest rounded border"
          className="w-full bg-surface-dark border border-surface-light-dark rounded p-2 focus:outline-none focus:border-secondary text-surface-light"
        />
      </div>
      <div>
        <Typography variant="h5" className="text-surface-light">
          Where do you live?
        </Typography>
        <Select
          value={selectedCountry}
          onChange={(value) => handleDataChange(value, "location")}
          className="!border-surface-light text-surface-light focus:!border-secondary select-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          placeholder="Select Country"
        >
          {countryOptions.map((country) => (
            <Option
              key={country.name}
              value={country.name}
              className="text-surface-mid-light"
            >
              {country.name}
            </Option>
          ))}
        </Select>
      </div>
      <div className="m-2 flex self-end">
        <Button
          className="bg-[#557C55] hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          className="bg-secondary hover:bg-primary mr-2 px-2 py-2 text-sm lg:py-3 lg:px-3"
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MainInfoCard;

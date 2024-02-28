import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Typography, Select, Option } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MainInfoCard = () => {
  const [userData, setUserData] = useState({
    dateOfBirth: "",
    location: "",
  });
  const handleDataChange = (value, type) => {
    if (type === "dateOfBirth"){
      //check if the age is bigger than 18
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      if (age < 18) {
        toast.error("You must be 18 years or older to use this app");
        return;
      }
    }

    setUserData((prevUserData) => ({ ...prevUserData, [type]: value }));
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[27rem] bg-surface-dark shadow-lg p-4 rounded">
      <div className="flex justify-between items-center">
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
      </div>
      <div className="m-2 flex items-center">
        <Button size="lg" className="bg-secondary hover:bg-primary mr-2">
          <Link to="/auth/set-activity-level">Back</Link>
        </Button>
        <Button size="lg" className="bg-secondary hover:bg-primary">
          <Link to="/auth/main-info-card">Next</Link>
        </Button>
      </div>
    </div>
  );
};

export default MainInfoCard;

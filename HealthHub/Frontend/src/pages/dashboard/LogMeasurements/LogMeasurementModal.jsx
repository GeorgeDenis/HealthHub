import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useUser } from "@/context/LoginRequired";
import { Modal } from "@mui/material";
import { Typography, Button } from "@material-tailwind/react";

const LogMeasurementsModal = ({
  isOpen,
  handleClose,
  refecthLoggedMeasurements,
}) => {
  const [todayMeasurements, setTodayMeasurements] = useState({});
  const [measurementsToLog, setMeasurementsToLog] = useState({});
  const currentUser = useUser();

  useEffect(() => {
    fetchTodayLoggedMeasurements();
  }, [isOpen]);
  useEffect(() => {
    if (todayMeasurements !== null) {
      setMeasurementsToLog({
        id: todayMeasurements.id,
        weight: todayMeasurements.weight,
        waistCircumference: todayMeasurements.waistCircumference,
        hipCircumference: todayMeasurements.hipCircumference,
        neckCircumference: todayMeasurements.neckCircumference,
        weightPhotoUrl: todayMeasurements.weightPhotoUrl,
      });
    }
  }, [todayMeasurements]);
  const fetchTodayLoggedMeasurements = async () => {
    try {
      const response = await api.get(
        `/api/v1/LoggedMeasurements/get-today/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        const loggedMeasurements = response.data.loggedMeasurements;
        setTodayMeasurements(loggedMeasurements);
      }
    } catch (error) {
      console.error("Error fetching logged measurements:", error);
    }
  };
  const handleMeasurementChange = (e, type) => {
    setMeasurementsToLog({
      ...measurementsToLog,
      [type]: e.target.value,
    });
  };
  const handleLogMeasurement = async () => {
    if (todayMeasurements !== null) {
      handleEditMeasurement();
    } else {
      handlePostMeasurement();
    }
  };
  const handlePostMeasurement = async () => {
    try {
      const response = await api.post(
        `/api/v1/LoggedMeasurements`,
        {
          userId: currentUser.userId,
          weight: measurementsToLog.weight,
          waistCircumference: measurementsToLog.waistCircumference,
          hipCircumference: measurementsToLog.hipCircumference,
          neckCircumference: measurementsToLog.neckCircumference,
          weightPhotoUrl: measurementsToLog.weightPhotoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Measurement logged successfully");
        refecthLoggedMeasurements();
        handleClose();
      }
    } catch (error) {
      console.error("Error logging measurement:", error);
      let errorMessage = "";
      if (error.response.data) {
        if (error.response.data.validationsErrors)
          errorMessage += error.response.data.validationsErrors[0];
        else errorMessage += "An error occurred while updating the measurement";
      }
      toast.error(errorMessage);
    }
  };
  const handleEditMeasurement = async () => {
    try {
      const response = await api.put(
        `/api/v1/LoggedMeasurements`,
        {
          id: measurementsToLog.id,
          userId: currentUser.userId,
          weight: measurementsToLog.weight,
          waistCircumference: measurementsToLog.waistCircumference,
          hipCircumference: measurementsToLog.hipCircumference,
          neckCircumference: measurementsToLog.neckCircumference,
          weightPhotoUrl: measurementsToLog.weightPhotoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        toast.success("Measurement updated successfully");
        refecthLoggedMeasurements();
        handleClose();
      }
    } catch (error) {
      console.error("Error updating measurement:", error);
      let errorMessage = "";
      if (error.response.data) {
        if (error.response.data.validationsErrors)
          errorMessage += error.response.data.validationsErrors[0];
        else errorMessage += "An error occurred while updating the measurement";
      }
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Modal open={isOpen} onClose={handleClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-[25rem] md:min-h-[32rem] w-[90vw] bg-surface-darkest shadow-lg p-5 rounded-lg">
          <div className="flex flex-col gap-6">
            <Typography
              className="text-md font-semibold mx-auto rounded bg-secondary p-2"
              color="white"
            >
              Log today's measurements
            </Typography>
            <div className="flex justify-between items-center">
              <Typography color="white">Weight:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToLog.weight || 0}
                onChange={(e) => handleMeasurementChange(e, "weight")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Waist:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToLog.waistCircumference || 0}
                onChange={(e) =>
                  handleMeasurementChange(e, "waistCircumference")
                }
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Hips:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToLog.hipCircumference || 0}
                onChange={(e) => handleMeasurementChange(e, "hipCircumference")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Neck:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToLog.neckCircumference || 0}
                onChange={(e) =>
                  handleMeasurementChange(e, "neckCircumference")
                }
              />
            </div>
            <Button
              className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
              onClick={() => {
                handleLogMeasurement();
              }}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogMeasurementsModal;

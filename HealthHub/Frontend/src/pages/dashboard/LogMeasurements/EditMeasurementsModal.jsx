import React, { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useUser } from "@/context/LoginRequired";
import { Typography, Button } from "@material-tailwind/react";
const EditMeasurementsModal = ({
  isOpen,
  handleClose,
  selectedMeasurement,
  refecthLoggedMeasurements,
}) => {
  const currentUser = useUser();
  const [measurementsToEdit, setMeasurementsToEdit] = useState({});
  useEffect(() => {
    setMeasurementsToEdit({
      weight: selectedMeasurement.weight,
      waistCircumference: selectedMeasurement.waistCircumference,
      hipCircumference: selectedMeasurement.hipCircumference,
      neckCircumference: selectedMeasurement.neckCircumference,
      weightPhotoUrl: selectedMeasurement.weightPhotoUrl,
    });
  }, [isOpen]);

  const handleMeasurementChange = (e, type) => {
    setMeasurementsToEdit({
      ...measurementsToEdit,
      [type]: e.target.value,
    });
  };
  const handleEditMeasurement = async () => {
    
    try {
      const response = await api.put(
        `/api/v1/LoggedMeasurements`,
        {
          id: selectedMeasurement.id,
          userId: currentUser.userId,
          weight: measurementsToEdit.weight,
          waistCircumference: measurementsToEdit.waistCircumference,
          hipCircumference: measurementsToEdit.hipCircumference,
          neckCircumference: measurementsToEdit.neckCircumference,
          weightPhotoUrl: measurementsToEdit.weightPhotoUrl,
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
              Edit your measurements
            </Typography>
            <div className="flex justify-between items-center">
              <Typography color="white">Weight:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToEdit.weight || 0}
                onChange={(e) => handleMeasurementChange(e, "weight")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Waist:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToEdit.waistCircumference || 0}
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
                value={measurementsToEdit.hipCircumference || 0}
                onChange={(e) => handleMeasurementChange(e, "hipCircumference")}
              />
            </div>
            <div className="flex justify-between items-center">
              <Typography color="white">Neck:</Typography>
              <input
                type="text"
                className=" bg-surface-light rounded-lg w-[10rem]  border border-gray-300 p-2"
                value={measurementsToEdit.neckCircumference || 0}
                onChange={(e) =>
                  handleMeasurementChange(e, "neckCircumference")
                }
              />
            </div>
            <Button
              className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
              onClick={() => {
                handleEditMeasurement();
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

export default EditMeasurementsModal;

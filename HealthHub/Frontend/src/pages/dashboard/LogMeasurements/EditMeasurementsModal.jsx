import React, { useState, useEffect, useRef } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { Modal } from "@mui/material";
import { useUser } from "@/context/LoginRequired";
import { Typography, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";

const EditMeasurementsModal = ({
  isOpen,
  handleClose,
  selectedMeasurement,
  refecthLoggedMeasurements,
  refreshPhotos,
}) => {
  const currentUser = useUser();
  const [measurementsToEdit, setMeasurementsToEdit] = useState({});
  const [photo, setPhoto] = useState(null);

  const fileInputRef = useRef(null);

  const handleAddPhotoClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    setMeasurementsToEdit({
      weight: selectedMeasurement.weight,
      waistCircumference: selectedMeasurement.waistCircumference,
      hipCircumference: selectedMeasurement.hipCircumference,
      neckCircumference: selectedMeasurement.neckCircumference,
    });
  }, [isOpen]);

  const handleMeasurementChange = (e, type) => {
    setMeasurementsToEdit({
      ...measurementsToEdit,
      [type]: e.target.value,
    });
  };
  const handleSaveData = async () => {
    if (
      measurementsToEdit.weight !== selectedMeasurement.weight ||
      measurementsToEdit.waistCircumference !==
        selectedMeasurement.waistCircumference ||
      measurementsToEdit.hipCircumference !==
        selectedMeasurement.hipCircumference ||
      measurementsToEdit.neckCircumference !==
        selectedMeasurement.neckCircumference
    ) {
      handleEditMeasurement();
    }
    if (photo) {
      handleSavePhoto();
    }
    handleClose();
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
  const handlePhotoNameSlice = (photoName) => {
    if (photoName.length > 10) {
      return photoName.slice(0, 15) + "..." + photoName.slice(-3);
    }
    return photoName;
  };
  const handleSavePhoto = async () => {
    if (!photo) {
      toast.error("No photo selected");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("File", photo);
      formData.append(
        "LoggedMeasurementsId",
        measurementsToEdit.id || selectedMeasurement.id,
      );

      formData.append("UserId", currentUser.userId);

      const response = await api.post(
        "/api/Cloud/measurements-photo",
        formData,
        {
          headers: {
            "Content-Type": undefined,
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      if (response.status === 200) {
        toast.success("Photo saved successfully");
        refreshPhotos();
      } else {
        toast.error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      toast.error("Error saving photo: " + error.toString());
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
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <Typography color="white">Add a photo: </Typography>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                />
                <Button
                  className="w-12 h-10 bg-secondary hover:bg-primary duration-200 flex items-center justify-center gap-2 p-2 rounded-lg mx-auto"
                  onClick={handleAddPhotoClick}
                >
                  <FontAwesomeIcon icon={faCameraRetro} size="2xl" beatFade />
                </Button>
              </div>
              {photo && (
                <p className="text-surface-light mx-auto mt-6">
                  {handlePhotoNameSlice(photo.name)}
                </p>
              )}
            </div>
            <Button
              className="mt-6 bg-secondary hover:bg-primary duration-200 w-[30%] mx-[35%]"
              onClick={() => {
                handleSaveData();
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

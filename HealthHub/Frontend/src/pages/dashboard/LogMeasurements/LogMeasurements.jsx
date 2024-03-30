import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useUser } from "@/context/LoginRequired";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWeightScale } from "@fortawesome/free-solid-svg-icons";
import ScaleIcon from "@mui/icons-material/Scale";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StraightenIcon from "@mui/icons-material/Straighten";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
} from "@material-tailwind/react";
import EditMeasurementsModal from "./EditMeasurementsModal";
import LogMeasurementsModal from "./LogMeasurementModal";
import LoggedWaist from "./Charts/LoggedWaist";
import LoggedNeck from "./Charts/LoggedNeck";
import LoggedHip from "./Charts/LoggedHip";
import LoggedWeight from "./Charts/LoggedWeight";
import MeasurementsPhotos from "./MeasurementsPhotos";

const CustomTooltip = ({ text, children }) => {
  return (
    <Tooltip
      TransitionComponent={Grow}
      TransitionProps={{ timeout: 600 }}
      title={text}
      className="w-1/5 flex flex-col items-center cursor-pointer"
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, -14],
              },
            },
          ],
        },
      }}
    >
      <div>{children}</div>
    </Tooltip>
  );
};

const LogMeasurements = () => {
  const currentUser = useUser();
  const [loggedMeasurements, setLoggedMeasurements] = useState([]);
  const [currentChart, setCurrentChart] = useState("1");
  const [isEditMeasurementsModalOpen, setIsEditMeasurementsModalOpen] =
    useState(false);
  const [isLogMeasurementsModalOpen, setIsLogMeasurementsModalOpen] =
    useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState({});
  const [refreshPhotos, setRefreshPhotos] = useState(false);

  useEffect(() => {
    fetchLoggedMeasurements();
  }, []);
  const refreshMeasurementsPhotos = () => {
    setRefreshPhotos((oldValue) => !oldValue);
  };

  const fetchLoggedMeasurements = async () => {
    try {
      const response = await api.get(
        `/api/v1/LoggedMeasurements/${currentUser.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        const loggedMeasurements = response.data.loggedMeasurements.sort(
          (a, b) => {
            return new Date(b.dateLogged) - new Date(a.dateLogged);
          },
        );
        setLoggedMeasurements(loggedMeasurements);
      }
    } catch (error) {
      console.error("Error fetching logged measurements:", error);
    }
  };

  const handleOpenLogMeasurementsModal = () => {
    setIsLogMeasurementsModalOpen(true);
  };
  const handleCloseLogMeasurementsModal = () => {
    setIsLogMeasurementsModalOpen(false);
  };
  const handleOpenEditMeasurementsModal = (item) => {
    setSelectedMeasurement(item);
    setIsEditMeasurementsModalOpen(true);
  };
  const handleCloseEditMeasurementsModal = () => {
    setIsEditMeasurementsModalOpen(false);
  };

  const handleChartChange = (value) => {
    setCurrentChart(value);
  };

  return (
    <>
      <div className="flex flex-col 2xl:flex-row items-center w-full gap-5">
        <Card className="bg-surface-dark shadow-sm w-full md:w-[70%] min-h-[30rem]">
          <CardHeader
            floated={false}
            shadow={false}
            className="m-0 flex items-center justify-between p-5 bg-transparent"
          >
            <Typography variant="h5" className="mb-1 text-surface-light">
              Your Measurements
            </Typography>
            <Button
              className="w-12 h-10 bg-secondary hover:bg-primary duration-200 flex items-center justify-center gap-2 p-2 rounded-lg"
              onClick={() => {
                handleOpenLogMeasurementsModal();
              }}
            >
              <FontAwesomeIcon icon={faWeightScale} size="2xl" beatFade />
            </Button>
          </CardHeader>
          <CardBody className="px-0 pt-0 pb-2 ">
            <div className="p-3">
              <div className="flex justify-between text-surface-light text-sm md:text-lg px-1 font-bold mb-2">
                <CustomTooltip text="Your Weight: Track your body mass here. Enter the value in kilograms.">
                  <p>Weight</p>
                  <ScaleIcon className="mt-1" />
                </CustomTooltip>
                <CustomTooltip text="Waist Measurement: Record the circumference of your waist at the narrowest point. Enter the value in centimeters.">
                  <p>Waist</p>
                  <StraightenIcon className="mt-1" />
                </CustomTooltip>
                <CustomTooltip text="Hip Measurement: Measure around the widest part of your hips and enter the figure here. Enter the value in centimeters.">
                  <p>Hips</p>
                  <SquareFootIcon className="mt-1" />
                </CustomTooltip>
                <CustomTooltip text="Neck Measurement: Provide the circumference of your neck just below the Adam's apple. Enter the value in centimeters.">
                  <p>Neck</p>
                  <PersonIcon className="mt-1" />
                </CustomTooltip>
                <div className="w-1/5 flex flex-col items-center">
                  <p>Date</p>
                  <CalendarMonthIcon className="mt-1" />
                </div>
              </div>
              <hr className="bg-green-600" />
              {loggedMeasurements.length !== 0 && (
                <div className="flex flex-col gap-3 mt-2">
                  {loggedMeasurements.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center h-8 bg-green-700 rounded-lg p-2 text-xs md:text-base hover:bg-green-200 cursor-pointer transition duration-200 ease-in-out"
                      onClick={() => handleOpenEditMeasurementsModal(item)}
                      style={{
                        backgroundColor: index === 0 ? "#74C365" : undefined,
                      }}
                    >
                      <p className="text-surface-light w-1/5 text-center">
                        {item.weight ? item.weight : <QuestionMarkIcon />}
                      </p>{" "}
                      <p className="text-surface-light w-1/5 text-center">
                        {item.waistCircumference ? (
                          item.waistCircumference
                        ) : (
                          <QuestionMarkIcon />
                        )}
                      </p>{" "}
                      <p className="text-surface-light w-1/5 text-center">
                        {item.hipCircumference ? (
                          item.hipCircumference
                        ) : (
                          <QuestionMarkIcon />
                        )}
                      </p>{" "}
                      <p className="text-surface-light w-1/5 text-center">
                        {item.neckCircumference ? (
                          item.neckCircumference
                        ) : (
                          <QuestionMarkIcon />
                        )}
                      </p>{" "}
                      <p className="text-surface-light w-1/5 text-center">
                        {item.dateLogged.split("T")[0]}
                      </p>{" "}
                    </div>
                  ))}
                </div>
              )}
              {loggedMeasurements.length === 0 && (
                <div>
                  <p className="my-auto rounded-lg p-2 text-surface-light text-center mt-10 h-10 bg-green-700">
                    No measurements logged yet
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        <div className="flex flex-col items-start">
          <select
            className="w-[10rem] h-10 rounded-lg text-surface-light bg-green-700 focus:outline-none appearance-none relative -mb-5 p-2"
            onChange={(e) => handleChartChange(e.target.value)}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' fill='white' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'/%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.5em 1.5em",
              paddingRight: "2.5rem",
            }}
          >
            <option value="1">Weight</option>
            <option value="2">Waist</option>
            <option value="3">Hips</option>
            <option value="4">Neck</option>
          </select>
          <div>
            {currentChart === "1" && (
              <LoggedWeight loggedMeasurements={loggedMeasurements} />
            )}
            {currentChart === "2" && (
              <LoggedWaist loggedMeasurements={loggedMeasurements} />
            )}
            {currentChart === "3" && (
              <LoggedHip loggedMeasurements={loggedMeasurements} />
            )}
            {currentChart === "4" && (
              <LoggedNeck loggedMeasurements={loggedMeasurements} />
            )}
          </div>
        </div>
      </div>

      {isEditMeasurementsModalOpen && (
        <EditMeasurementsModal
          isOpen={isEditMeasurementsModalOpen}
          handleClose={handleCloseEditMeasurementsModal}
          selectedMeasurement={selectedMeasurement}
          refecthLoggedMeasurements={fetchLoggedMeasurements}
          refreshPhotos={refreshMeasurementsPhotos}
        />
      )}
      {isLogMeasurementsModalOpen && (
        <LogMeasurementsModal
          isOpen={isLogMeasurementsModalOpen}
          handleClose={handleCloseLogMeasurementsModal}
          refecthLoggedMeasurements={fetchLoggedMeasurements}
        />
      )}
      <MeasurementsPhotos refreshTrigger={refreshPhotos} />
    </>
  );
};

export default LogMeasurements;

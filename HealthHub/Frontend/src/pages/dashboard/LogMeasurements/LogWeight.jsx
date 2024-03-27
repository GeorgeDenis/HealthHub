import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { useUser } from "@/context/LoginRequired";
import ScaleIcon from "@mui/icons-material/Scale";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import StraightenIcon from "@mui/icons-material/Straighten";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
} from "@material-tailwind/react";

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
        {children}
      </Tooltip>
  );
};

const LogMeasurements = () => {
  const currentUser = useUser();
  const [loggedMeasurements, setLoggedMeasurements] = useState([]);
  useEffect(() => {
    fetchLoggedMeasurements();
  }, []);
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
  return (
    <Card className="mt-12 bg-surface-dark shadow-sm w-full">
      <CardHeader
        floated={false}
        shadow={false}
        className="m-0 flex items-center justify-between p-5 bg-transparent"
      >
        <Typography variant="h5" className="mb-1 text-surface-light">
          Your Measurements
        </Typography>
      </CardHeader>
      <CardBody className="px-0 pt-0 pb-2 ">
        {/* <table className="w-full min-w-[640px] table-auto">
          {loggedMeasurements.length != 0 && (
            <thead>
              <tr>
                {["weight", "waist", "hip", "neck", "date logged"].map((headerItem) => (
                  <th
                    key={headerItem}
                    className="border-b border-primary py-3 px-3 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-surface-light"
                    >
                      {headerItem}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {loggedMeasurements.length > 0 &&
              loggedMeasurements.map((item, index) => {
                return (
                  <tr key={index} className="text-surface-light">
                    <td>{item.weight}</td>
                    <td>{item.waistCircumference || "Not logged"}</td>
                    <td>{item.hipCircumference}</td>
                    <td>{item.neckCircumference}</td>
                    <td>{item.dateLogged.split("T")[0]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table> */}
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
                  className="flex justify-between items-center h-8 bg-green-700 rounded-lg p-2 text-xs md:text-base"
                  style={{
                    backgroundColor: index === 0 ? "#74C365" : undefined,
                  }}
                >
                  <p className="text-surface-light w-1/5 text-center">
                    {item.weight}
                  </p>{" "}
                  <p className="text-surface-light w-1/5 text-center">
                    {item.waistCircumference}
                  </p>{" "}
                  <p className="text-surface-light w-1/5 text-center">
                    {item.hipCircumference}
                  </p>{" "}
                  <p className="text-surface-light w-1/5 text-center">
                    {item.neckCircumference}
                  </p>{" "}
                  <p className="text-surface-light w-1/5 text-center">
                    {item.dateLogged.split("T")[0]}
                  </p>{" "}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default LogMeasurements;

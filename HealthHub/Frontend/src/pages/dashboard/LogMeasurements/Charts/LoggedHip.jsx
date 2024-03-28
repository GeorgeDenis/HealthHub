import { useEffect, useState } from "react";
import chartsConfig from "../../Home/Banners/charts-config";
import StatisticsChart from "../../Home/Banners/StatisticsChart";

import React from "react";

const LoggedHip = ({ loggedMeasurements }) => {
  const [chart, setChart] = useState({});
  useEffect(() => {
    handleMeasurement();
  }, [loggedMeasurements]);
  const handleMeasurement = () => {
    loggedMeasurements = loggedMeasurements.sort((a, b) => {
      return new Date(b.dateLogged) - new Date(a.dateLogged);
    });
    loggedMeasurements = loggedMeasurements
      .filter((measurement) => measurement.hipCircumference !== null)
      .reverse();
    const hipCircumferences = loggedMeasurements.map((measurement) => {
      return {
        hipCircumference: measurement.hipCircumference,
        dateLogged: measurement.dateLogged,
      };
    });
    const chartData = {
      series: [
        {
          name: "Neck",
          data: hipCircumferences.map((hip) => hip.hipCircumference),
        },
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },

      stroke: {
        curve: "straight",
      },
      title: {
        text: "Hip Over Time",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#FFFFFF", "transparent"],
          opacity: 0.5,
        },
      },
      options: {
        ...chartsConfig,
        colors: ["#4cbb17"],
        xaxis: {
          categories: hipCircumferences.map((hip) =>
            new Date(hip.dateLogged).toLocaleDateString(),
          ),
        },
      },
    };

    setChart(chartData);
  };

  return (
    <>
      {Object.keys(chart).length > 0 && (
        <StatisticsChart
          chart={chart}
          title="Logged Hip Circumference"
          description="Your logged hip circumference over time"
        />
      )}
    </>
  );
};

export default LoggedHip;

import { useEffect, useState } from "react";
import chartsConfig from "../../Home/Banners/charts-config";
import StatisticsChart from "../../Home/Banners/StatisticsChart";

import React from "react";

const LoggedNeck = ({ loggedMeasurements }) => {
  const [chart, setChart] = useState({});
  useEffect(() => {
    handleMeasurement();
  }, [loggedMeasurements]);
  const handleMeasurement = () => {
    loggedMeasurements = loggedMeasurements.sort((a, b) => {
      return new Date(b.dateLogged) - new Date(a.dateLogged);
    });
    loggedMeasurements = loggedMeasurements
      .filter((measurement) => measurement.neckCircumference !== null)
      .reverse();

    const neckCircumferences = loggedMeasurements.map((measurement) => {
      return {
        neckCircumference: measurement.neckCircumference,
        dateLogged: measurement.dateLogged,
      };
    });
    const chartData = {
      series: [
        {
          name: "Neck",
          data: neckCircumferences.map((neck) => neck.neckCircumference),
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
        text: "Neck Over Time",
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
          categories: neckCircumferences.map((neck) =>
            new Date(neck.dateLogged).toLocaleDateString(),
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
          title="Logged Neck Circumference"
          description="Your logged neck circumference over time"
        />
      )}
    </>
  );
};

export default LoggedNeck;

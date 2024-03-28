import { useEffect, useState } from "react";
import chartsConfig from "../../Home/Banners/charts-config";
import StatisticsChart from "../../Home/Banners/StatisticsChart";

import React from "react";

const LoggedWaist = ({loggedMeasurements}) => {
  const [chart, setChart] = useState({});
  useEffect(() => {
    handleMeasurement();
  }, [loggedMeasurements]);
  const handleMeasurement = () => {
    loggedMeasurements = loggedMeasurements.sort((a, b) => {
      return new Date(b.dateLogged) - new Date(a.dateLogged);
    });
    loggedMeasurements = loggedMeasurements
      .filter((measurement) => measurement.waistCircumference !== null)
      .reverse();

    const waistCircumferences = loggedMeasurements.map((measurement) => {
      return {
        waistCircumference: measurement.waistCircumference,
        dateLogged: measurement.dateLogged,
      };
    });
    const chartData = {
      series: [
        {
          name: "Waist",
          data: waistCircumferences.map((waist) => waist.waistCircumference),
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
        text: "Waist Over Time",
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
          categories: waistCircumferences.map((waist) =>
            new Date(waist.dateLogged).toLocaleDateString(),
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
          title="Logged Waist Circumference"
          description="Your logged waist circumference over time"
        />
      )}
    </>
  );
};

export default LoggedWaist;

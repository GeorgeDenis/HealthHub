import { useEffect, useState } from "react";
import chartsConfig from "../../Home/Banners/charts-config";
import StatisticsChart from "../../Home/Banners/StatisticsChart";

const LoggedWeight = ({ loggedMeasurements }) => {
  const [chart, setChart] = useState({});
  useEffect(() => {
    handleMeasurement();
  }, [loggedMeasurements]);
  const handleMeasurement = () => {
    loggedMeasurements = loggedMeasurements.sort((a, b) => {
      return new Date(b.dateLogged) - new Date(a.dateLogged);
    });
    loggedMeasurements = loggedMeasurements
      .filter((measurement) => measurement.weight !== null)
      .reverse();

    const weights = loggedMeasurements.map((measurement) => {
      return {
        weight: measurement.weight,
        dateLogged: measurement.dateLogged,
      };
    });
    const chartData = {
      series: [
        {
          name: "Waist",
          data: weights.map((weight) => weight.weight),
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
          categories: weights.map((weight) =>
            new Date(weight.dateLogged).toLocaleDateString(),
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
          title="Logged Weight"
          description="Your logged weight over time"
        />
      )}
    </>
  );
};

export default LoggedWeight;

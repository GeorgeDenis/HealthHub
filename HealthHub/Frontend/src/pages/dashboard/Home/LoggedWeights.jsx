import { useEffect, useState } from "react";
import api from "../../../services/api";
import chartsConfig from "./Banners/charts-config";
import { useUser } from "@/context/LoginRequired";
import StatisticsChart from "./Banners/StatisticsChart";
const LoggedWeights = () => {
  const currentUser = useUser();
  const [chart, setChart] = useState({});
  useEffect(() => {
    fetchLoggedWeights();
  }, []);
  const fetchLoggedWeights = async () => {
    try {
      const response = await api.get(
        `/api/v1/LoggedWeight/${currentUser?.userId}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );
      if (response.status === 200) {
        const weights = response.data.loggedWeights.sort(function (a, b) {
          return new Date(a.dateLogged) - new Date(b.dateLogged);
        });

        const chartData = {
          series: [
            {
              name: "Weight",
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
            text: "Weight Over Time",
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
      }
    } catch (error) {
      console.error(`Error while getting stats: ${error}`);
    }
  };
  return (
    <>
      {Object.keys(chart).length > 0 && (
        <StatisticsChart
          chart={chart}
          title="Logged Weights"
          description="Your logged weights over time"
        />
      )}
    </>
  );
};

export default LoggedWeights;

export const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#FFFFFF",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#FFFFFF",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
      formatter: function (val) {
        return val.toFixed(0);
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#FFFFFF",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
  noData: {
    text: "No weight logged yet.",
    align: "center",
    verticalAlign: "middle",
    offsetX: 0,
    offsetY: -15,
    style: {
      color: "#FFFFFF",
      fontSize: "20px",
    },
  },
};

export default chartsConfig;

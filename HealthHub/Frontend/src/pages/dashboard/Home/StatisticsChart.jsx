import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";

const StatisticsChart = ({ chart, title, description }) => {
  return (
    <Card className="bg-surface-dark shadow-sm mb-4 mt-10 w-[20rem] md:w-[30rem]">
      <CardHeader
        variant="gradient"
        className="bg-surface-darkest"
        floated={false}
        shadow={false}
      >
        <Chart {...chart} />
      </CardHeader>
      <CardBody className="mt-4 px-6 pt-0">
        <Typography variant="h5" className="text-surface-light">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-surface-light">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
};

export default StatisticsChart;

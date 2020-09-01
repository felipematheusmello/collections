import React from "react";
import { Pie } from "react-chartjs-2";

const Chart = ({ characters = [] }) => {
  const charactersData = characters.reduce((current, { type }) => {
    current[type] ? (current[type] += 1) : (current[type] = 1);
    return current;
  }, {});

  const data = {
    labels: Object.keys(charactersData),
    datasets: [
      {
        data: Object.values(charactersData),
        backgroundColor: ["#123652", "#3A7113"],
        hoverBackgroundColor: ["#123652", "#3A7113"],
      },
    ],
  };

  return <Pie data={characters !== null && data} />;
};

export default Chart;

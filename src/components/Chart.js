import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const Chart = ({ filteredMembers, totalMembers }) => {
  const chartData = {
    labels: ["검색 결과", ""],
    datasets: [
      {
        data: [filteredMembers.length, totalMembers - filteredMembers.length],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div style={{ width: "150px", height: "150px", margin: "auto" }}>
      <Pie data={chartData} />
    </div>
  );
};

export default Chart;
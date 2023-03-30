import React, { useState } from "react";
import { Line } from "react-chartjs-2";

function CustomLineGraph(props) {
  /*
  Custom Line Graph using ChartJS
  
  */
  return (
    <>
      <Line options={props.options} data={props.data} />
    </>
  );
}

export default CustomLineGraph;

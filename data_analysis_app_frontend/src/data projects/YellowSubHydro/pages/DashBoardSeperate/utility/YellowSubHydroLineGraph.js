import React, { useState } from "react";
function YellowSubHydroLineGraph(props) {
  /*

  A line graph for each county to seperate the graph.
  
  Outlining the plan for this look.
  The top of the screen will encompass a variety of text buttons containing the names,
  of each county. 
  Below will be a filter that will basically check if these characters are contained withing each string.

  Below that will be a description and a back button.

  First I need to find a way to create the seperation.
  
  */

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tracking Flood Severity level across counties",
        padding: {
          bottom: 20,
        },
        font: {
          size: 36,
          style: "bold",
          family: "Helvetica Neue",
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Flood Severity Level",
          font: {
            size: 20,
            style: "italic",
            family: "Helvetica Neue",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Date recorded",
          font: {
            size: 20,
            style: "italic",
            family: "Helvetica Neue",
          },
        },
      },
    },
  };

  return (
    <>
      <div>Hello</div>
    </>
  );
}

export default YellowSubHydroLineGraph;

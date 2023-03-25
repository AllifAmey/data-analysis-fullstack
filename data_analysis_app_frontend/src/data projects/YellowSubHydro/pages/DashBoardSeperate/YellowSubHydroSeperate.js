import React, { useState } from "react";
import YellowSubHydroLineGraph from "./utility/YellowSubHydroLineGraph";
import { useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";

function YellowSubHydroSeperate(props) {
  /*
  
  This page will be about plotting the data on a graph individually for each county. 

  The way it will work is actually quite simple - 

  */

  const { floodSeverityDataset } = useSelector(
    (state) => state.YellowSubHydroData
  );

  return (
    <>
      <YellowSubHydroLineGraph />
      <Button
        onClick={() => {
          console.log(floodSeverityDataset);
        }}
      ></Button>
    </>
  );
}

export default YellowSubHydroSeperate;

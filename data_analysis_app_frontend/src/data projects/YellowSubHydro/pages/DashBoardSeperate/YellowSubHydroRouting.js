import React, { useState } from "react";
import YellowSubHydroLineGraph from "./utility/YellowSubHydroLineGraph";
import { useSelector } from "react-redux";
import CountyButton from "./utility/CountyButton";
import { Container, Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function YellowSubHydroRouting(props) {
  /*
  
  This page will be about plotting the data on a graph individually for each county. 

  plans for this component:

  Add a filter system at the bottom to make it easier to navigate the many counties.

  */

  const { floodSeverityDataset } = useSelector(
    (state) => state.YellowSubHydroData
  );

  const mainCountyButtonContainerStyles = {
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
  };

  return (
    <>
      <YellowSubHydroLineGraph />
      <Container height="auto" width="100%">
        <Flex sx={mainCountyButtonContainerStyles}>
          {floodSeverityDataset.map((data) => {
            console.log(data);
            return <CountyButton county={data.label} />;
          })}
          <Button
            colorScheme="green"
            as={RouterLink}
            to="/project/yellowsubhydro"
            sx={{ marginBottom: "2rem", padding: "20px" }}
          >
            Back
          </Button>
        </Flex>
      </Container>
    </>
  );
}

export default YellowSubHydroRouting;

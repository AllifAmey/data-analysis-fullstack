import React from "react";
import { useSelector } from "react-redux";
import CountyButton from "./utility/CountyButton";
import { Flex, Button } from "@chakra-ui/react";
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

  const mainFlexContainerStyles = {
    justifyContent: "space-evenly",
    alignItems: "start",
    textAlign: "center",
  };

  const sideFlexContainerStyles = {
    flexDirection: "Column",
    gap: 4,
    justifyContent: "space-evenly",
  };

  const recent_datasets = floodSeverityDataset.filter((data) => {
    if (data.data[data.data.length - 1] == null) {
      return false;
    } else {
      return true;
    }
  });
  const no_recent_datasets = floodSeverityDataset.filter((data) => {
    if (data.data[data.data.length - 1] == null) {
      return true;
    } else {
      return false;
    }
  });

  console.log(recent_datasets);

  return (
    <>
      <Flex
        sx={sideFlexContainerStyles}
        width="100%"
        alignItems="center"
        marginTop="2rem"
      >
        <Flex sx={mainFlexContainerStyles} width="90vw">
          <Flex sx={sideFlexContainerStyles}>
            <div>Recent Data</div>
            {recent_datasets.map((data) => {
              return (
                <CountyButton
                  county={data.label}
                  key={data.label}
                  styles={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    width: "300px",
                  }}
                />
              );
            })}
          </Flex>
          <Flex sx={sideFlexContainerStyles}>
            <div>Historic Data</div>
            {no_recent_datasets.map((data) => {
              return (
                <CountyButton
                  county={data.label}
                  key={data.label}
                  styles={{
                    whiteSpace: "normal",
                    wordWrap: "break-word",
                    width: "300px",
                  }}
                />
              );
            })}
          </Flex>
        </Flex>
        <Button
          colorScheme="green"
          as={RouterLink}
          to="/project/yellowsubhydro"
          sx={{
            margin: "2rem 0",
            padding: "20px",
            alignSelf: "center",
          }}
        >
          Back
        </Button>
      </Flex>
    </>
  );
}

export default YellowSubHydroRouting;

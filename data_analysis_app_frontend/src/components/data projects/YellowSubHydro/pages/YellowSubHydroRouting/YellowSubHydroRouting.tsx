import React from "react";
import { useSelector } from "react-redux";
import CountyButton from "./utility/CountyButton";
import { Flex, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const YellowSubHydroRouting = () => {
  /*
  
  This page will be about plotting the data on a graph individually for each county. 

  plans for this component:

  Add a filter system at the bottom to make it easier to navigate the many counties.

  */

  // TODO: the 2 types below (not third ) are repeated turn it into a model
  type floodSeverityDatasetTypes = {
    recent_floodDataIDs: string[] | null;
    label: string;
    data: (number | null)[];
    borderColor: string;
    backgroundColor: string;
  };
  type initialStateType = {
    floodSeverityDataset: floodSeverityDatasetTypes[];
    graphBottomlabel: string[];
    graphOptions: any;
  };
  type stateType = {
    YellowSubHydroData: initialStateType;
  };
  const { floodSeverityDataset } = useSelector((state: stateType) => {
    return state.YellowSubHydroData;
  });

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
  const recent_datasets = floodSeverityDataset.filter(
    (data: floodSeverityDatasetTypes) => {
      if (data.data[data.data.length - 1] == null) {
        return false;
      } else {
        return true;
      }
    }
  );
  const no_recent_datasets = floodSeverityDataset.filter(
    (data: floodSeverityDatasetTypes) => {
      if (data.data[data.data.length - 1] == null) {
        return true;
      } else {
        return false;
      }
    }
  );

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
            {recent_datasets.map((data: floodSeverityDatasetTypes) => {
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
            {no_recent_datasets.map((data: floodSeverityDatasetTypes) => {
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
};

export default YellowSubHydroRouting;

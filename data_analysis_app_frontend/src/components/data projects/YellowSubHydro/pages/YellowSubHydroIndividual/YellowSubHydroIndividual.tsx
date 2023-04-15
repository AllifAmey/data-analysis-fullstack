import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import CustomLineGraph from "../../../VisualizationTools/CustomLineGraph";

import YellowSubHydroMap from "./utility/YellowSubHydroMap";

const YellowSubHydroIndividual = () => {
  /*
  Individual display of the flood severity data.
  */

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

  const [dataset, setDataset] = useState<floodSeverityDatasetTypes[] | null>(
    null
  );
  const [IsLoading, setIsLoading] = useState<boolean>(true);

  const params = useParams();

  const { floodSeverityDataset, graphOptions, graphBottomlabel } = useSelector(
    (state: stateType) => state.YellowSubHydroData
  );

  const countyDataset = floodSeverityDataset.filter(
    (data: floodSeverityDatasetTypes) => {
      if (data.label == params.county) {
        return true;
      }
    }
  );
  const recent_floodAreaIDs = countyDataset[0].recent_floodDataIDs;

  useEffect(() => {
    const countyDataset = floodSeverityDataset.filter(
      (data: floodSeverityDatasetTypes) => {
        if (data.label == params.county) {
          return true;
        }
      }
    );
    setDataset(countyDataset);
    setIsLoading(false);
  }, []);

  const data = {
    labels: graphBottomlabel,
    datasets: dataset,
  };

  const mainFlexStyles = {
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px",
  };

  return (
    <>
      {IsLoading ? (
        <div>Loading</div>
      ) : (
        <Flex sx={mainFlexStyles}>
          <CustomLineGraph options={graphOptions} data={data} />
          {recent_floodAreaIDs !== null && (
            <Text fontSize="2xl">
              Look at where the flood severity data is on the map.
            </Text>
          )}
          {recent_floodAreaIDs === null && (
            <Text fontSize="2xl">No recent data to plot onto a map.</Text>
          )}
          <YellowSubHydroMap setIsLoading={setIsLoading} />

          <Button
            width=" 70px"
            as={RouterLink}
            to="/project/yellowsubhydro/seperate"
          >
            Back
          </Button>
        </Flex>
      )}
    </>
  );
};

export default YellowSubHydroIndividual;

import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import CustomLineGraph from "../../../VisualizationTools/CustomLineGraph";
import MainBtnGroup from "./utility/MainBtnGroup";

import { useDispatch } from "react-redux";
import {
  placeInfloodSeverityDataset,
  placeIngraphOptions,
  placeInBottomlabel,
} from "../../../../redux/YellowSubHydroData";
import { ParseData } from "./utility/ParseData";

import { getFlood, postFlood } from "../../APIs/InternalAPI/FloodAPI";
import { getGovFlood } from "../../APIs/ExternalAPI/GovFloodAPI";

function YellowSubHydroMain() {
  /*
  The way this is going to work:
  https://environment.data.gov.uk/flood-monitoring/doc/reference to get the docs
  Grab data from http://environment.data.gov.uk/flood-monitoring/id/floods

  sales pitch: 

  The goal here is to track severity levels across different parts of the country - 
  this will allow the government or other planners to know when to evacuate people,
  in the event of severe floading as they can easily see it on 
  
  */

  const [isLoading, setIsLoading] = useState(false);
  const [bottomLabel, setBottomLabel] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const dispatch = useDispatch();

  function inputGovData() {
    getGovFlood(setIsLoading).then((data) => {
      let process_data = [];
      for (const item of data.items) {
        process_data.push({
          floodAreaID: item.floodAreaID,
          county: item.floodArea.county,
          flood_severity_lvl: item.severityLevel,
        });
      }
      postFlood(setIsLoading, process_data).then((_) => {
        getFlood(setIsLoading).then((data) => {
          const [unique_vals_creation_date, entireDataset] = ParseData(data);
          setDatasets(entireDataset);
          setBottomLabel(unique_vals_creation_date);
        });
      });
    });
  }
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

  useEffect(() => {
    getFlood(setIsLoading).then((data) => {
      const [unique_vals_creation_date, entireDataset] = ParseData(data);
      dispatch(placeIngraphOptions(options));
      dispatch(placeInBottomlabel(unique_vals_creation_date));
      dispatch(placeInfloodSeverityDataset(entireDataset));
      setDatasets(entireDataset);
      setBottomLabel(unique_vals_creation_date);
    });
    let interval = setInterval(() => {
      inputGovData();
    }, 15 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  const labels = bottomLabel;

  const data = {
    labels,
    datasets: datasets,
  };

  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          height="100vh"
          width="100%"
          gap="4rem"
        >
          <Text fontSize="18px" width="80%" sx={{ textAlign: "center" }}>
            This uses Environment Agency flood and river level data from the
            real-time data API (Beta)
          </Text>
          <CustomLineGraph options={options} data={data} />
          <Flex width="100%" justifyContent="space-evenly">
            <MainBtnGroup inputGovData={inputGovData} />
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default YellowSubHydroMain;
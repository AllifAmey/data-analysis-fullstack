import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import CustomLineGraph from "../../../VisualizationTools/CustomLineGraph";
import MainBtnGroup from "./utility/MainBtnGroup";
import PeriscopeModal from "./utility/PeriscipeModal";

import { useDispatch } from "react-redux";
import {
  placeInfloodSeverityDataset,
  placeIngraphOptions,
  placeInBottomlabel,
} from "../../../../redux/YellowSubHydroData";
import { ParseData } from "./utility/ParseData";

import { getFlood, postFlood } from "../../APIs/InternalAPI/FloodAPI";
import { getGovFlood } from "../../APIs/ExternalAPI/GovFloodAPI";

type dataset = {
  recent_floodDataIDs: any[] | null;
  label: string;
  data: any[];
  borderColor: string;
  backgroundColor: string;
};

const YellowSubHydroMain = () => {
  /*
  The way this is going to work:
  https://environment.data.gov.uk/flood-monitoring/doc/reference to get the docs
  Grab data from http://environment.data.gov.uk/flood-monitoring/id/floods

  sales pitch: 

  The goal here is to track severity levels across different parts of the country - 
  this will allow the government or other planners to know when to evacuate people,
  in the event of severe floading as they can easily see it on the map.
  
  */

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bottomLabel, setBottomLabel] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<dataset[]>([]);

  const dispatch = useDispatch();

  function onClose(): void {
    setIsOpen(false);
  }

  // This is where the ETL pipeline begins.
  function inputGovData(): void {
    // grab data and EXTRACT floodAreaID, count and flood severity level
    getGovFlood(setIsLoading).then((data) => {
      interface PostFloodData {
        floodAreaID: string;
        county: string;
        flood_severity_lvl: number;
      }
      let process_data: PostFloodData[] = [];

      for (const item of data.items) {
        process_data.push({
          floodAreaID: item.floodAreaID,
          county: item.floodArea.county,
          flood_severity_lvl: item.severityLevel,
        });
      }
      // LOAD the data to the database
      // Then grab the data from database to TRANSFORM
      // on frontend.
      postFlood(setIsLoading, process_data).then(() => {
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
          size: 30,
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
  }, []);

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
            <MainBtnGroup inputGovData={inputGovData} setIsOpen={setIsOpen} />
          </Flex>
          <PeriscopeModal isOpen={isOpen} onClose={onClose} />
        </Flex>
      )}
    </>
  );
};

export default YellowSubHydroMain;

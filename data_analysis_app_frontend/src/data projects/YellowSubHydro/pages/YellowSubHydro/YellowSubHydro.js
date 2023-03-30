import React, { useState, useEffect, useRef } from "react";
import { Container, Flex, Button } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Line } from "react-chartjs-2";

import { useDispatch } from "react-redux";
import {
  placeInfloodSeverityDataset,
  placeIngraphOptions,
  placeInBottomlabel,
} from "../../../../redux/YellowSubHydroData";

import { getFlood, postFlood } from "../../APIs/InternalAPI/FloodAPI";
import { getGovFlood } from "../../APIs/ExternalAPI/GovFloodAPI";

function YellowSubHydro() {
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
          // I'll consider doing this in the backend to more hastly,
          // parse the data for now it's on the client side.
          let unique_vals_creation_date = [
            ...new Set(data.map((x) => x.creation_date)),
          ];
          dispatch(placeInBottomlabel(unique_vals_creation_date));
          let unique_vals_counties = [...new Set(data.map((x) => x.county))];

          const entireDataset = [];
          for (const county of unique_vals_counties) {
            const filtered_county = data.filter((datapoint) => {
              return datapoint.county == county;
            });
            // initial_data_time are filled with arrays up to the length of creation-date
            // this is so that data can be plotted in the next piece of logic.
            let initial_data_time = Array(
              unique_vals_creation_date.length
            ).fill(null);
            for (const filtered_county_data of filtered_county) {
              // the index of the creation_date in relation to unique_creation date is detected
              // this is then used to know where the data should be plotted on the graph.

              const data_time_index = unique_vals_creation_date.indexOf(
                filtered_county_data.creation_date
              );
              initial_data_time[data_time_index] =
                filtered_county_data.flood_severity_lvl;
            }
            // border colours are randomised between 0, 249
            // the background colours are added plus 5 so the max it could be 254
            // this doesn't break the rgb colour thing.
            // Temporary measure but necessary measure so values can be uniquely identified.
            const r = Math.floor(Math.random() * 250);
            const g = Math.floor(Math.random() * 250);
            const b = Math.floor(Math.random() * 250);
            entireDataset.push({
              label: county,
              data: initial_data_time,
              borderColor: `rgb(${r}, ${g}, ${b})`,
              backgroundColor: `rgb(${r + 5}, ${g + 5}, ${b + 5})`,
            });
          }
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
      // I'll consider doing this in the backend to more hastly,
      // parse the data for now it's on the client side.
      let unique_vals_creation_date = [
        ...new Set(data.map((x) => x.creation_date)),
      ];
      dispatch(placeInBottomlabel(unique_vals_creation_date));
      let unique_vals_counties = [...new Set(data.map((x) => x.county))];

      const entireDataset = [];
      for (const county of unique_vals_counties) {
        const filtered_county = data.filter((datapoint) => {
          return datapoint.county == county;
        });
        // initial_data_time are filled with arrays up to the length of creation-date
        // this is so that data can be plotted in the next piece of logic.
        let initial_data_time = Array(unique_vals_creation_date.length).fill(
          null
        );
        for (const filtered_county_data of filtered_county) {
          // the index of the creation_date in relation to unique_creation date is detected
          // this is then used to know where the data should be plotted on the graph.

          const data_time_index = unique_vals_creation_date.indexOf(
            filtered_county_data.creation_date
          );
          initial_data_time[data_time_index] =
            filtered_county_data.flood_severity_lvl;
        }
        // border colours are randomised between 0, 249
        // the background colours are added plus 5 so the max it could be 254
        // this doesn't break the rgb colour thing.
        // Temporary measure but necessary measure so values can be uniquely identified.
        const r = Math.floor(Math.random() * 250);
        const g = Math.floor(Math.random() * 250);
        const b = Math.floor(Math.random() * 250);
        let recent_floodDataIDs = null;
        const has_recent_data = initial_data_time[initial_data_time.length - 1];
        const recent_time =
          unique_vals_creation_date[unique_vals_creation_date.length - 1];

        if (has_recent_data != null) {
          // grab the recent filtered_county filter.
          recent_floodDataIDs = [];
          const recent_data = filtered_county.filter((e) => {
            return e.creation_date == recent_time;
          });

          for (const data of recent_data) {
            recent_floodDataIDs.push(data.floodAreaID);
          }
        }

        entireDataset.push({
          recent_floodDataIDs: recent_floodDataIDs,
          label: county,
          data: initial_data_time,
          borderColor: `rgb(${r}, ${g}, ${b})`,
          backgroundColor: `rgb(${r + 5}, ${g + 5}, ${b + 5})`,
        });
      }
      setDatasets(entireDataset);
      dispatch(placeInfloodSeverityDataset(entireDataset));
      setBottomLabel(unique_vals_creation_date);
      dispatch(placeIngraphOptions(options));
      let interval = setInterval(() => {
        inputGovData();
      }, 15 * 60 * 1000);
      return () => {
        clearInterval(interval);
      };
    });
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
          <Line options={options} data={data} />
          <Flex width="100%" justifyContent="space-evenly">
            <Button
              colorScheme="green"
              as={RouterLink}
              to="/"
              sx={{ marginBottom: "2rem", padding: "20px" }}
            >
              Back
            </Button>
            <Button
              colorScheme="green"
              as={RouterLink}
              to="/project/yellowsubhydro/seperate"
              sx={{ marginBottom: "2rem", padding: "20px" }}
            >
              Seperate Graphs
            </Button>
            <Button
              colorScheme="green"
              onClick={() => {
                inputGovData();
              }}
              sx={{ marginBottom: "2rem", padding: "20px" }}
            >
              Grab Data Now
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default YellowSubHydro;

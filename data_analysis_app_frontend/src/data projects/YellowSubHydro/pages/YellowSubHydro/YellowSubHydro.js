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
import { placeInStore } from "../../../../redux/YellowSubHydroData";

import { getFlood, postFlood } from "../../APIs/InternalAPI/FloodAPI";
import { getGovFlood } from "../../APIs/ExternalAPI/GovFloodAPI";

function YellowSubHydro() {
  const [isLoading, setIsLoading] = useState(false);
  const [bottomLabel, setBottomLabel] = useState([]);
  const [datasets, setDatasets] = useState([]);

  /*
  The way this is going to work:
  https://environment.data.gov.uk/flood-monitoring/doc/reference to get the docs
  Grab data from http://environment.data.gov.uk/flood-monitoring/id/floods
  In each item:
  Get the county
  get the severity level
  Place that model into a 
  Call that api every 15 minutes using setTimeout()

  I may or may not parse all of the data but I will try a few in the beginning.

  The aim is to plot these on a graph and to explain where each datapoint comes from.

  sales pitch: 

  The goal here is to track severity levels across different parts of the country - 
  this will allow the government or other planners to know when to evacuate people,
  in the event of severe floading as they can easily see it on 
  
  */

  /*
  Advice from Alex -
  1) Add units to the left Y axis
2) Date format - you probably don't need all that.
If you want to keep it use 2023-03-23 10:52:55

But I would probably just go 23/03 10:52 - as the graph isn't covering a very big time period.
Or whatever you think is best?

3)The grab data button is cool - but the data is injected at the same 'spacing' - so the points could be 30 mins or 30 seconds apart and would look the same.
Don't know how easy that is to fix though.

4) I'm not exactly sure how - but reduce the number of items in the key? There are too many colours to easily understand.
What are you really interested in here? I guess it is the change that matters? What I have seen done before is lots keys in grey or the same color.
And then only the few that matter are in a brighter colour.

Or you could give everything under the same value the same color - (assuming you don't have that many discrete values in this case)

5) Or maybe group into different plots of groups of counties? Again this is probably a bit tricky.

6) I'd make the chart title a bit bigger.

  Priorities:
  Add units to the left axis 

  Seperate the plots 
  "Or maybe group into different plots of groups of counties? 
  Again this is probably a bit tricky."

  Chart title bigger. 



  */
  const dispatch = useDispatch();

  function inputGovData() {
    getGovFlood(setIsLoading).then((data) => {
      let process_data = [];
      for (const item of data.items) {
        process_data.push({
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

  useEffect(() => {
    getFlood(setIsLoading).then((data) => {
      // I'll consider doing this in the backend to more hastly,
      // parse the data for now it's on the client side.
      let unique_vals_creation_date = [
        ...new Set(data.map((x) => x.creation_date)),
      ];
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
        entireDataset.push({
          label: county,
          data: initial_data_time,
          borderColor: `rgb(${r}, ${g}, ${b})`,
          backgroundColor: `rgb(${r + 5}, ${g + 5}, ${b + 5})`,
        });
      }
      setDatasets(entireDataset);
      dispatch(placeInStore(entireDataset));
      setBottomLabel(unique_vals_creation_date);

      let interval = setInterval(() => {
        inputGovData();
      }, 15 * 60 * 1000);
      return () => {
        clearInterval(interval);
      };
    });
  }, [dispatch]);

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

import React from "react";
// do not remove code line 3 or there will be a canvas error.
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Flex, Box, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function DatasetDisplayData(props) {
  /*
  This is the component to display data.
  
  The purpose is to allow a more flexible use of displaying data. 
  
  Change the Bar to change how data is displayed.
  
  */

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Displaying average,median and mode from sales",
      },
    },
  };

  return (
    <>
      <Flex
        flexDirection="column"
        height="600px"
        justifyContent="space-between"
        alignItems="center"
        flex={1}
      >
        <Box height="400px" width="400px">
          <Bar
            options={options}
            datasetIdKey="id"
            data={{
              labels: ["Average", "Medium", "Mode"],
              datasets: [
                {
                  id: 1,
                  label: "Dataset 1",
                  data: [...props.datasetAnalysis1],
                },
                {
                  id: 2,
                  label: "Dataset 2",
                  data: [...props.datasetAnalysis2],
                },
              ],
            }}
          />
        </Box>
        <div>
          <b>Add 5</b> - Add 5 random sales datapoints.
        </div>
        <div>
          <b>Delete 5 </b> - Delete 5 random sales datapoints.
        </div>
        <div>
          <b>Bulk Delete </b>- Delete all sales datapoints
        </div>
        <div>
          <b>CRUD</b> - CREATE, RETRIEVE, UPDATE, DELETE datapoints
        </div>
        <Button
          variant="solid"
          colorScheme="blue"
          as={RouterLink}
          to="/"
          width="70px"
        >
          Back
        </Button>
      </Flex>
    </>
  );
}

export default DatasetDisplayData;

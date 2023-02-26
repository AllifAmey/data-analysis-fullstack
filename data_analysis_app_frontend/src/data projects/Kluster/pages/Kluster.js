import React from "react";
// do not remove code line 3 or there will be a canvas error.
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Container, Flex, Box, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

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

function Kluster() {
  /*
    For the first phase - 
    Displaying data for averages,mean and median using numpy.
    This is to get a feel for data visualisation then to proceed to more complicated,
    developments. This is the start.  
    Second phase - 
    Add 5 button adds 5 random pieces of data to the dataset
    Delete 5 delets 5 random pieces of data to the dataset. 
    Custom does the customary CRUD.
    Delete all
    */
  const containerStyles = {
    width: "100%",
    height: "auto",
    padding: "0px",
    margin: "0px",
    textAlign: "center",
  };
  const dataset_1 = [1, 2, 3, 4, 5, 6, 7, 8];
  const dataset_2 = [12, 23, 34, 44, 55, 36, 17, 28];
  return (
    <>
      <Container sx={containerStyles}>
        <Flex alignItems="center" height="100vh" width="100vw">
          <Flex alignSelf="start" flexDirection="column" gap="2rem" flex={1}>
            <Box margin="5rem" display="flex" flexDirection="column" gap="2rem">
              <div>Sales Dataset 1</div>
              <div>{`${dataset_1}`}</div>
            </Box>
            <Flex justifyContent="space-evenly">
              <Button
                variant="ghost"
                colorScheme="green"
                as={RouterLink}
                to="/"
                width="70px"
              >
                Add 5
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                as={RouterLink}
                to="/"
                width="90px"
              >
                Delete 5
              </Button>
              <Button
                variant="ghost"
                colorScheme="blackAlpha"
                as={RouterLink}
                to="/"
                width="110px"
              >
                Bulk Delete
              </Button>
            </Flex>
            <Button
              variant="ghost"
              colorScheme="blue"
              as={RouterLink}
              to="/"
              width="80px"
              alignSelf="center"
            >
              CRUD
            </Button>
          </Flex>

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
                      data: [1, 2, 3],
                    },
                    {
                      id: 2,
                      label: "Dataset 2",
                      data: [4, 5, 6],
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
          <Flex alignSelf="start" flexDirection="column" gap="2rem" flex={1}>
            <Box margin="5rem">
              <div>Sales Dataset 2</div>
              <div>{`${dataset_2}`}</div>
            </Box>
            <Flex justifyContent="space-evenly">
              <Button
                variant="ghost"
                colorScheme="green"
                as={RouterLink}
                to="/"
                width="70px"
              >
                Add 5
              </Button>
              <Button
                variant="ghost"
                colorScheme="red"
                as={RouterLink}
                to="/"
                width="90px"
              >
                Delete 5
              </Button>
              <Button
                variant="ghost"
                colorScheme="blackAlpha"
                as={RouterLink}
                to="/"
                width="110px"
              >
                Bulk Delete
              </Button>
            </Flex>
            <Button
              variant="ghost"
              colorScheme="blue"
              as={RouterLink}
              to="/"
              width="80px"
              alignSelf="center"
            >
              CRUD
            </Button>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default Kluster;

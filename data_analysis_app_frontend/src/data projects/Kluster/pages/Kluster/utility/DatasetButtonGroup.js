import React, { useState } from "react";

import { Flex, Button } from "@chakra-ui/react";

import { postRandom, getDatasetSpecific } from "../../../APIs/DatasetAPI";

function DatasetButtonGroup(props) {
  /*
  Group of buttons for each dataset and their intended functionality.
  The props inherits from the dataset props which itself gets its data,
  from the main Kluster page Kluster.js
  
  */
  return (
    <>
      <Flex justifyContent="space-evenly">
        <Button
          variant="ghost"
          colorScheme="green"
          width="70px"
          onClick={() => {
            postRandom(
              props.setIsLoading,
              props.datasetNum,
              "add_5",
              props.setdataset1Data,
              props.setdataset2Data,
              props.setdatasetAnalysis1,
              props.setdatasetAnalysis2
            ).then((_) => {});
          }}
        >
          Add 5
        </Button>
        <Button
          variant="ghost"
          colorScheme="red"
          width="90px"
          onClick={() => {
            postRandom(
              props.setIsLoading,
              props.datasetNum,
              "delete_5",
              props.setdataset1Data,
              props.setdataset2Data,
              props.setdatasetAnalysis1,
              props.setdatasetAnalysis2
            ).then((_) => {});
          }}
        >
          Delete 5
        </Button>
        <Button
          variant="ghost"
          colorScheme="blackAlpha"
          width="110px"
          onClick={() => {
            postRandom(
              props.setIsLoading,
              props.datasetNum,
              "bulk_delete",
              props.setdataset1Data,
              props.setdataset2Data,
              props.setdatasetAnalysis1,
              props.setdatasetAnalysis2
            ).then((_) => {});
          }}
        >
          Bulk Delete
        </Button>
      </Flex>
      <Button
        variant="ghost"
        colorScheme="blue"
        width="80px"
        alignSelf="center"
        onClick={() => {
          getDatasetSpecific(props.setIsLoading, props.datasetNum).then(
            (data) => {
              props.setIsOpen(true);
              props.setdatasetDataModalid(props.datasetNum);
              props.setmodalData(data);
              console.log(`data is ${data}`);
            }
          );
        }}
      >
        CRUD
      </Button>
    </>
  );
}

export default DatasetButtonGroup;

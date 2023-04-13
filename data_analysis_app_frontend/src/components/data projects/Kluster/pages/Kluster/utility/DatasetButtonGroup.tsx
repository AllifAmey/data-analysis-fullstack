import React from "react";

import { Flex, Button } from "@chakra-ui/react";

import { postRandom, getDatasetSpecific } from "../../../APIs/DatasetAPI";

type props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  datasetNum: number;
  setdataset1Data: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdataset2Data: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdatasetAnalysis1: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdatasetAnalysis2: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdatasetDataModalid: React.Dispatch<React.SetStateAction<number | boolean>>;
  setmodalData: React.Dispatch<React.SetStateAction<number[] | boolean>>;
};

const DatasetButtonGroup = ({
  setIsLoading,
  setIsOpen,
  datasetNum,
  setdataset1Data,
  setdataset2Data,
  setdatasetAnalysis1,
  setdatasetAnalysis2,
  setdatasetDataModalid,
  setmodalData,
}: props) => {
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
              setIsLoading,
              datasetNum,
              "add_5",
              setdataset1Data,
              setdataset2Data,
              setdatasetAnalysis1,
              setdatasetAnalysis2
            );
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
              setIsLoading,
              datasetNum,
              "delete_5",
              setdataset1Data,
              setdataset2Data,
              setdatasetAnalysis1,
              setdatasetAnalysis2
            );
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
              setIsLoading,
              datasetNum,
              "bulk_delete",
              setdataset1Data,
              setdataset2Data,
              setdatasetAnalysis1,
              setdatasetAnalysis2
            );
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
          getDatasetSpecific(setIsLoading, datasetNum).then((data) => {
            setIsOpen(true);
            setdatasetDataModalid(datasetNum);
            setmodalData(data);
            console.log(`data is ${data}`);
          });
        }}
      >
        CRUD
      </Button>
    </>
  );
};

export default DatasetButtonGroup;

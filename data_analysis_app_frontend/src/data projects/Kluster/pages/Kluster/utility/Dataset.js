import React, { useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import DatasetButtonGroup from "./DatasetButtonGroup";

function Dataset(props) {
  /*
    opinion:
    Debating whether it's right to pass data through 3 components.
    Would seperating the component be good long-term if I want to customise,
    the dataset.
    
    future outlook:
    Think about adding customisation but perhaps implementing a seperate,
    component later.

    props:
    props.datasetNum, - what is the dataset number
    props.dataset1Data = dataset data for data 1
    props.dataset2Data = dataset data for data 2
    props.setdataset1Data, - to set dataset 1 data inside apis
    props.setdataset2Data, - to set dataset 2 data inside apis
    props.setdatasetAnalysis1, - to set the datasetAnalysis for dataset 1
    props.setdatasetAnalysis2 - to set the datasetAnalysis for dataset 2
    props.setIsOpen(true); - sets whether modal is open
    props.setdatasetDataModalid(props.datasetNum); - sets the dataset id for the modal
    props.setmodalData(data); - sets the modal data.
    
    */
  return (
    <>
      <Flex alignSelf="start" flexDirection="column" gap="2rem" flex={1}>
        <Box margin="5rem" display="flex" flexDirection="column" gap="2rem">
          <div>Sales Dataset {`${props.datasetNum}`}</div>
          <div>
            {props.datasetNum == 1
              ? `${props.dataset1Data}`
              : `${props.dataset2Data}`}
          </div>
        </Box>
        <DatasetButtonGroup
          setdataset1Data={props.setdataset1Data}
          setdataset2Data={props.setdataset2Data}
          setdatasetAnalysis1={props.setdatasetAnalysis1}
          setdatasetAnalysis2={props.setdatasetAnalysis2}
          setIsOpen={props.setIsOpen}
          setdatasetDataModalid={props.setdatasetDataModalid}
          setmodalData={props.setmodalData}
          setIsLoading={props.setIsLoading}
          datasetNum={props.datasetNum}
        />
      </Flex>
    </>
  );
}

export default Dataset;

import React from "react";
import { Flex, Box } from "@chakra-ui/react";
import DatasetButtonGroup from "./DatasetButtonGroup";
/*

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
type props = {
  datasetNum: number;
  dataset1Data: number[] | null;
  dataset2Data: number[] | null;
  setdataset1Data: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdataset2Data: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdatasetAnalysis1: React.Dispatch<React.SetStateAction<number[] | null>>;
  setdatasetAnalysis2: React.Dispatch<React.SetStateAction<number[] | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setdatasetDataModalid: React.Dispatch<React.SetStateAction<number | boolean>>;
  setmodalData: React.Dispatch<React.SetStateAction<number[] | boolean>>;
};

const Dataset = ({
  datasetNum,
  dataset1Data,
  dataset2Data,
  setdataset1Data,
  setdataset2Data,
  setdatasetAnalysis1,
  setdatasetAnalysis2,
  setIsLoading,
  setIsOpen,
  setdatasetDataModalid,
  setmodalData,
}: props) => {
  return (
    <>
      <Flex alignSelf="start" flexDirection="column" gap="2rem" flex={1}>
        <Box margin="5rem" display="flex" flexDirection="column" gap="2rem">
          <div>Sales Dataset {`${datasetNum}`}</div>
          <div>{datasetNum === 1 ? `${dataset1Data}` : `${dataset2Data}`}</div>
        </Box>
        <DatasetButtonGroup
          setdataset1Data={setdataset1Data}
          setdataset2Data={setdataset2Data}
          setdatasetAnalysis1={setdatasetAnalysis1}
          setdatasetAnalysis2={setdatasetAnalysis2}
          setIsOpen={setIsOpen}
          setdatasetDataModalid={setdatasetDataModalid}
          setmodalData={setmodalData}
          setIsLoading={setIsLoading}
          datasetNum={datasetNum}
        />
      </Flex>
    </>
  );
};

export default Dataset;

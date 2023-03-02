import React, { useState, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { getAnalysis } from "../../APIs/DatasetAPI";
import DatasetModal from "./utility/DatasetModal";
import Dataset from "./utility/Dataset";
import DatasetDisplayData from "./utility/DatasetDisplayData";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [datasetDataModalid, setdatasetDataModalid] = useState(false);
  const [modalData, setmodalData] = useState(false);
  const [dataset1Data, setdataset1Data] = useState([]);
  const [dataset2Data, setdataset2Data] = useState([]);
  const [datasetAnalysis1, setdatasetAnalysis1] = useState([]);
  const [datasetAnalysis2, setdatasetAnalysis2] = useState([]);

  useEffect(() => {
    getAnalysis(
      setIsLoading,
      setdataset1Data,
      setdataset2Data,
      setdatasetAnalysis1,
      setdatasetAnalysis2
    ).then((analysis) => {
      console.log(analysis);
    });
  }, []);

  function onClose() {
    getAnalysis(
      setIsLoading,
      setdataset1Data,
      setdataset2Data,
      setdatasetAnalysis1,
      setdatasetAnalysis2
    ).then((analysis) => {
      console.log(analysis);
      setIsOpen(false);
    });
  }

  const containerStyles = {
    width: "100%",
    height: "auto",
    padding: "0px",
    margin: "0px",
    textAlign: "center",
  };
  return (
    <>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Container sx={containerStyles}>
          <Flex alignItems="center" height="100vh" width="100vw">
            <Dataset
              datasetNum={1}
              dataset1Data={dataset1Data}
              setdataset1Data={setdataset1Data}
              setdataset2Data={setdataset2Data}
              setdatasetAnalysis1={setdatasetAnalysis1}
              setdatasetAnalysis2={setdatasetAnalysis2}
              setIsOpen={setIsOpen}
              setdatasetDataModalid={setdatasetDataModalid}
              setmodalData={setmodalData}
              setIsLoading={setIsLoading}
            />

            <DatasetDisplayData
              datasetAnalysis1={datasetAnalysis1}
              datasetAnalysis2={datasetAnalysis2}
            />
            <Dataset
              datasetNum={2}
              dataset1Data={dataset1Data}
              dataset2Data={dataset2Data}
              setdataset1Data={setdataset1Data}
              setdataset2Data={setdataset2Data}
              setdatasetAnalysis1={setdatasetAnalysis1}
              setdatasetAnalysis2={setdatasetAnalysis2}
              setIsOpen={setIsOpen}
              setdatasetDataModalid={setdatasetDataModalid}
              setmodalData={setmodalData}
              setIsLoading={setIsLoading}
            />
          </Flex>
          <DatasetModal
            setIsLoading={setIsLoading}
            modalData={modalData}
            setmodalData={setmodalData}
            datasetDataModalid={datasetDataModalid}
            isOpen={isOpen}
            onClose={onClose}
          />
        </Container>
      )}
    </>
  );
}

export default Kluster;

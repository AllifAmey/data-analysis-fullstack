import React, { useState } from "react";
import {
  Container,
  Flex,
  Box,
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { GoTools, GoTrashcan } from "react-icons/go";
import { patchDatapoint, deleteDatapoint } from "../APIs/DatasetAPI";

function DatasetModal(props) {
  /*
    
    
    */
  const [changeDataPoint, setchangeDataPoint] = useState(null);
  const [trackChange, setTrackChange] = useState(null);
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          // add get analysis data I guess here.
          console.log("I am closed!");
          props.setIsOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Dataset Data: {props.datasetDataModalid}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="1rem">
              {props.modalData == false
                ? ""
                : props.modalData.map((datapoint) => {
                    // Here is where the ids come along
                    return (
                      <Flex justifyContent="space-evenly" key={datapoint.id}>
                        <Box alignSelf="center">{datapoint.data}</Box>
                        <Flex
                          flexDirection="column"
                          justifyContent="space-evenly"
                          alignItems="center"
                          gap="1rem"
                        >
                          <div>Update</div>
                          <GoTools
                            color="green"
                            onClick={() => {
                              console.log("hello");
                              setchangeDataPoint(datapoint);
                            }}
                          />
                        </Flex>
                        <Flex
                          flexDirection="column"
                          justifyContent="space-evenly"
                          alignItems="center"
                          gap="1rem"
                        >
                          <div>Delete</div>{" "}
                          <GoTrashcan
                            color="red"
                            onClick={() => {
                              deleteDatapoint(
                                props.setIsLoading,
                                datapoint.id
                              ).then((res) => {
                                console.log(res);
                                let currentData = [...props.modalData];
                                const dataIndex = currentData.findIndex(
                                  (e) => e.id == datapoint.id
                                );
                                currentData.splice(dataIndex, 1);
                                props.setmodalData([...currentData]);
                              });
                            }}
                          />
                        </Flex>
                      </Flex>
                    );
                  })}
              {changeDataPoint !== null && (
                <Box textAlign="center">
                  You are changing Datapoint {changeDataPoint.data}
                </Box>
              )}
              {changeDataPoint !== null && (
                <NumberInput defaultValue={"empty"}>
                  <NumberInputField
                    onChange={(event) => {
                      setTrackChange(event.target.value);
                    }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            </Flex>
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            gap="2rem"
          >
            {changeDataPoint !== null ? (
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap="2rem  "
              >
                <Button
                  variant="solid"
                  colorScheme="green"
                  onClick={() => {
                    console.log(changeDataPoint);
                    console.log(trackChange);
                    if (trackChange != null) {
                      patchDatapoint(
                        props.setIsLoading,
                        changeDataPoint.id,
                        changeDataPoint.dataset,
                        trackChange
                      ).then((res) => {
                        console.log(res);
                        let currentData = [...props.modalData];
                        const dataIndex = currentData.findIndex(
                          (e) => e.id == changeDataPoint.id
                        );
                        currentData[dataIndex].data = trackChange;
                        props.setmodalData([...currentData]);
                        setchangeDataPoint(null);
                        setTrackChange(null);
                      });
                    } else {
                      console.log("error");
                    }

                    // now send a patch request then update the data then done.
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    setchangeDataPoint(null);
                    setTrackChange(null);
                  }}
                >
                  Cancel Edit
                </Button>
              </Flex>
            ) : (
              ""
            )}

            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                props.onClose();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DatasetModal;

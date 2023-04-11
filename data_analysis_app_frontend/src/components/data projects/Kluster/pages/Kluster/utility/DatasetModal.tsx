import React, { useState } from "react";
import {
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
import {
  postDatapoint,
  patchDatapoint,
  deleteDatapoint,
} from "../../../APIs/DatasetAPI";

/*
TODO: define the props 
type props = {
  example: string;
};

const DatasetModal = ({ example }: props) => {
*/

function DatasetModal(props: any) {
  /*
    Modal appears after CRUD button has been pressed.

    This shows the data for a particular dataset,
    Individual pieces of data can be edited or deleted.
    Datapoints can also be created.
    
    */

  // TODO: Define the useState instead of <any>
  const [changeDataPoint, setchangeDataPoint] = useState<any>(null);
  const [trackInput, setTrackInput] = useState<any>(null);

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
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
                : props.modalData.map((datapoint: any) => {
                    /*
                  TODO: define datapoint
                  */

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
                  You are
                  {changeDataPoint.data != undefined
                    ? ` changing Datapoint ${changeDataPoint.data}`
                    : " creating a new datapoint"}
                </Box>
              )}
              {changeDataPoint !== null && (
                <NumberInput defaultValue={"empty"}>
                  <NumberInputField
                    onChange={(event) => {
                      setTrackInput(event.target.value);
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
                    console.log(trackInput);
                    if (
                      trackInput != null &&
                      changeDataPoint.data != undefined
                    ) {
                      //patch datapoint
                      patchDatapoint(
                        props.setIsLoading,
                        changeDataPoint.id,
                        changeDataPoint.dataset,
                        trackInput
                      ).then((res) => {
                        console.log(res);
                        let currentData = [...props.modalData];
                        const dataIndex = currentData.findIndex(
                          (e) => e.id == changeDataPoint.id
                        );
                        currentData[dataIndex].data = trackInput;
                        props.setmodalData([...currentData]);
                        setchangeDataPoint(null);
                        setTrackInput(null);
                      });
                    } else if (
                      // post datapoint
                      trackInput != null &&
                      changeDataPoint.create_new_datapoint === true
                    ) {
                      postDatapoint(
                        props.setIsLoading,
                        props.datasetDataModalid,
                        trackInput
                      ).then((res) => {
                        let currentData = [...props.modalData];
                        console.log(res);
                        currentData.push(res);
                        props.setmodalData([...currentData]);
                        setchangeDataPoint(null);
                        setTrackInput(null);
                      });
                    }
                  }}
                >
                  {changeDataPoint.create_new_datapoint === true
                    ? "Confirm"
                    : "Edit"}
                </Button>
                <Button
                  variant="solid"
                  colorScheme="red"
                  onClick={() => {
                    setchangeDataPoint(null);
                    setTrackInput(null);
                  }}
                >
                  Cancel Edit
                </Button>
              </Flex>
            ) : (
              ""
            )}
            <Flex>
              <Button
                colorScheme="green"
                mr={3}
                onClick={() => {
                  setchangeDataPoint({ create_new_datapoint: true });
                }}
              >
                Create
              </Button>

              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  props.onClose();
                }}
              >
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DatasetModal;

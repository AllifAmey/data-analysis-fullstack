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

type props = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  modalData: any;
  setmodalData: React.Dispatch<React.SetStateAction<boolean | number[]>>;
  datasetDataModalid: number | boolean;
  onClose: Function;
};

const DatasetModal = ({
  setIsLoading,
  isOpen,
  modalData,
  setmodalData,
  datasetDataModalid,
  onClose,
}: props) => {
  /*
    Modal appears after CRUD button has been pressed.

    This shows the data for a particular dataset,
    Individual pieces of data can be edited or deleted.
    Datapoints can also be created.
    
    */

  type datapoint = {
    id: number;
    dataset: number;
    data: number;
  };
  type changeDataPointTypes = {
    id?: number;
    dataset?: number;
    data?: number;
    create_new_datapoint?: boolean;
  };

  const [changeDataPoint, setchangeDataPoint] =
    useState<changeDataPointTypes | null>(null);
  const [trackInput, setTrackInput] = useState<string | null>(null);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            Dataset Data: {datasetDataModalid}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="1rem">
              {modalData == false
                ? ""
                : modalData.map((datapoint: datapoint) => {
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
                              console.log("this is datapoint");
                              console.log(datapoint);
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
                              deleteDatapoint(setIsLoading, datapoint.id).then(
                                (res) => {
                                  console.log(res);
                                  let currentData = [...modalData];
                                  const dataIndex = currentData.findIndex(
                                    (e) => e.id == datapoint.id
                                  );
                                  currentData.splice(dataIndex, 1);
                                  setmodalData([...currentData]);
                                }
                              );
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
                        setIsLoading,
                        changeDataPoint.id,
                        changeDataPoint.dataset,
                        trackInput
                      ).then((res) => {
                        console.log(res);
                        let currentData = [...modalData];
                        const dataIndex = currentData.findIndex(
                          (e) => e.id == changeDataPoint.id
                        );
                        currentData[dataIndex].data = trackInput;
                        setmodalData([...currentData]);
                        setchangeDataPoint(null);
                        setTrackInput(null);
                      });
                    } else if (
                      // post datapoint
                      trackInput != null &&
                      changeDataPoint.create_new_datapoint === true
                    ) {
                      postDatapoint(
                        setIsLoading,
                        datasetDataModalid,
                        trackInput
                      ).then((res) => {
                        let currentData = [...modalData];
                        console.log(res);
                        currentData.push(res);
                        setmodalData([...currentData]);
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
                  onClose();
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
};

export default DatasetModal;

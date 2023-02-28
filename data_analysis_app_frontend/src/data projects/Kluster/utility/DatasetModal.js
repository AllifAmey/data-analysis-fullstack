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
} from "@chakra-ui/react";
import { GoTools, GoTrashcan } from "react-icons/go";
import { deleteDatapoint } from "../APIs/DatasetAPI";

function DatasetModal(props) {
  /*
    
    
    */
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
                      <Flex justifyContent="space-evenly">
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
                                //
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
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                props.setIsOpen(false);
              }}
            >
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DatasetModal;

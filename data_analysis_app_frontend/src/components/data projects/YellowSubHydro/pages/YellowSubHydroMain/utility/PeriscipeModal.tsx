import {
  Flex,
  Text,
  Box,
  Button,
  ModalContent,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  Select,
  Input,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";

import { BsCheckSquare } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

type props = {
  isOpen: boolean;
  onClose: () => void;
};

const PeriscopeModal = ({ isOpen, onClose }: props) => {
  /*
  The inspiration: 

  https://yellowsubhydro.com/wp-content/uploads/2023/02/Screenshot-2023-02-03-at-15.10.03-1536x891.png

  Translate the inspiration into frontend code as definitive proof of my abilities.

  Next step is looking at pieces of data that could be useful to digest. 
  
  */

  //styles

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        variant="persicope"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex flexDirection="column" gap={1}>
              <Text>Modify Station </Text>
              <Text fontSize="sm" fontWeight="normal" color="#5b5c5d">
                ASSINIBOINE RIVER AT SHELLMOUTH BRIDGE
              </Text>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Flex flexDirection="column" gap={2}>
                <Flex flexDirection="column" gap={1}>
                  <Text>Variable</Text>
                  <Select
                    placeholder="Selection here..."
                    color="#6a6c6d"
                    bg="#212225"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </Flex>
                <Flex flexDirection="column" gap={1}>
                  <Text>Shift Value</Text>
                  <Flex>
                    <Input type="number" placeholder="+200 mm" />
                    <Button
                      colorScheme="whiteAlpha"
                      variant="ghost"
                      leftIcon={<BsCheckSquare />}
                    >
                      Apply
                    </Button>
                  </Flex>
                </Flex>
                <Flex flexDirection="column" gap={1}>
                  <Text>Multiply Value</Text>
                  <Flex>
                    <Input type="number" placeholder="x1.02" />
                    <Button
                      colorScheme="whiteAlpha"
                      variant="ghost"
                      leftIcon={<BsCheckSquare />}
                    >
                      Apply
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex flexDirection="column">
                <Text>Station Notes</Text>
                <Box width="200px" height="200px" bg="#212225">
                  <Flex flexDirection="column" justifyContent="space-between">
                    <Text>
                      I've modified the temperature variable here by 100mm due
                      to the anomaly.
                    </Text>
                    <Text>12 days ago</Text>
                  </Flex>
                </Box>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            gap="2rem"
          >
            <Flex gap={2}>
              <Button
                colorScheme="whiteAlpha"
                variant="ghost"
                leftIcon={<RxCrossCircled />}
                size="sm"
              >
                Discard Changes
              </Button>
              <Button colorScheme="blue" leftIcon={<BsCheckSquare />} size="sm">
                Save Modifcation
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PeriscopeModal;

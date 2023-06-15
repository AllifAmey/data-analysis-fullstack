import React from "react";
import {
  Center,
  Button,
  Flex,
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EmpowerWomanUser = () => {
  /*
  pretty simple get a api that checks everything and returns everything.
  
  
  */

  //styles
  // bg="#e9f7fe"

  return (
    <>
      <Box height="100vh">
        <Flex
          width="100%"
          height="100%"
          bg="#e9f7fe"
          flexDirection="column"
          gap="4rem"
        >
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList>
              <Tab>Events Attending</Tab>
              <Tab>Events Available</Tab>
              <Tab>Calender</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box width="100%" height="400px" bg="yellow">
                  Events Attending
                </Box>
              </TabPanel>
              <TabPanel>
                <Box width="100%" height="400px" bg="orange">
                  Events Available
                </Box>
              </TabPanel>
              <TabPanel>
                <Box width="100%" height="400px" bg="white">
                  Calender
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Flex justifyContent="center">
            <Button
              w="100px"
              as={RouterLink}
              to={"/frontend/EmpowerWomanHome/account/login"}
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default EmpowerWomanUser;

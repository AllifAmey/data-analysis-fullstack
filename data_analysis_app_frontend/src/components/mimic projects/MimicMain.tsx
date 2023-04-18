import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// ? is optional but when given it has to be as defined.

const MimicMain = () => {
  /*
  The purpose of this is to mimic what companies want
  
  */

  //styles

  return (
    <>
      <Flex flexDirection="column" alignItems="center" gap="3rem">
        <Card align="center">
          <CardHeader>
            <Heading size="xl"> Empoweredwomen</Heading>
          </CardHeader>
          <CardBody>
            <Flex flexDirection="column" gap={2} alignItems="center">
              <Text fontSize="lg">
                Event management system where a admin can create events and
                users can attend events.
              </Text>
              <Text fontSize="sm">
                Inspired by Mentell - https://www.mentell.org.uk/
              </Text>
            </Flex>
          </CardBody>
          <CardFooter>
            <Button
              colorScheme="pink"
              as={RouterLink}
              to={"/mimics/EmpowerWomanHome"}
            >
              View here
            </Button>
          </CardFooter>
        </Card>
        <Button colorScheme="teal" as={RouterLink} to={"/"}>
          Back
        </Button>
      </Flex>
    </>
  );
};

export default MimicMain;

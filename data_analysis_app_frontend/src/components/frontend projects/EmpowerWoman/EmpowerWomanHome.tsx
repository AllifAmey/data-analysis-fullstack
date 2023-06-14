import React from "react";
import { Center, Button, Flex, Box, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

// ? is optional but when given it has to be as defined.

const EmpowerWomanHome = () => {
  /*
  Outlining the problem and features required:
  problem - 
  I want to be able to create events easily and automatically send a reminder.
  Solution:
  Create a admin page to set up events.
  Create a admin user 
  ( make sure in the backend api the email is checked under no circumstance make that user,
    an actual admin of the django backend or she can wreck havoc )
  Create a sign up page that mimics mentell
  For the average user page - You will have two things calender and event.
  In the events you will have a list of events.
  In the calender you have the time slots when the event is to be held.   
  
  */

  //styles

  return (
    <>
      <Box height="100vh">
        <Flex
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          bg="#e9f7fe"
          flexDirection="column"
          gap="4rem"
        >
          <Heading>Join Events</Heading>
          <Box width="50%" textAlign="center">
            <Text>
              We also hold monthly discussions to discuss topics that are
              important to our community. We have held a number of discussions
              on body image, self-love, work-life balance, and many others.
            </Text>
          </Box>

          <Flex width="80%" justifyContent="center" color="white">
            <Button
              margin="0 4rem"
              bg="#ff922b"
              _hover={{ bg: "#e8590c" }}
              size="lg"
              as={RouterLink}
              to={"/mimics/EmpowerWomanHome/account/login"}
            >
              Login
            </Button>
            <Button
              margin="0 4rem"
              bg="#ff922b"
              _hover={{ bg: "#e8590c" }}
              size="lg"
              as={RouterLink}
              to={"/mimics/EmpowerWomanHome/account/signup"}
            >
              Sign Up
            </Button>
          </Flex>
          <Button colorScheme="teal" as={RouterLink} to={"/mimics"}>
            Back
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default EmpowerWomanHome;

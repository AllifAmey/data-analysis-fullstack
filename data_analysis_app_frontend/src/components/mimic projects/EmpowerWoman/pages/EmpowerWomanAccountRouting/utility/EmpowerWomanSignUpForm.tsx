import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const EmpowerWomanSignUpForm = () => {
  /*
  
  
  */

  //styles
  return (
    <>
      <Box color="#2670a1" height="100vh" width="100%">
        <Flex
          justifyContent="center"
          bg="#fff"
          height="100%"
          flexDirection="column"
        >
          <Flex
            flexDirection="column"
            height="80%"
            width="100%"
            alignItems="center"
            gap="2rem"
          >
            <Heading>Personal Details</Heading>
            <Flex gap="3rem">
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  borderColor="#83d0f5"
                  bg="#e9f7fe"
                  _placeholder={{ color: "#74b0da" }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  borderColor="#83d0f5"
                  bg="#e9f7fe"
                  _placeholder={{ color: "#74b0da" }}
                />
              </FormControl>
            </Flex>
            <Flex gap="2rem">
              <FormControl isRequired w="500px">
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  borderColor="#83d0f5"
                  bg="#e9f7fe"
                  _placeholder={{ color: "#74b0da" }}
                />
              </FormControl>
            </Flex>
            <Flex gap="2rem">
              <FormControl isRequired w="500px">
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password"
                  borderColor="#83d0f5"
                  bg="#e9f7fe"
                  _placeholder={{ color: "#74b0da" }}
                />
              </FormControl>
            </Flex>
            <Flex gap="8rem" paddingTop="2rem">
              <Button w="100px" as={RouterLink} to={"/mimics/EmpowerWomanHome"}>
                Back
              </Button>
              <Button w="100px" as={RouterLink} to={"/mimics/EmpowerWomanHome"}>
                Sign Up!
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default EmpowerWomanSignUpForm;

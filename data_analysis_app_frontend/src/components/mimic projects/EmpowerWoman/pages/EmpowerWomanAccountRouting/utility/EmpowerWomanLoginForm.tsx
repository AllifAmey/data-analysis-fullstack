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
  HStack,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { GoSmiley } from "react-icons/go";

const EmpowerWomanLoginForm = () => {
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
            justifyContent="space-evenly"
          >
            <Flex gap="2rem">
              <Heading>Login page</Heading>
              <GoSmiley size={36} />
            </Flex>

            <Flex gap="2rem" flexDirection="column" w="30%">
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  borderColor="#83d0f5"
                  bg="#e9f7fe"
                  _placeholder={{ color: "#74b0da" }}
                />
              </FormControl>
              <FormControl isRequired>
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
                Login
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default EmpowerWomanLoginForm;

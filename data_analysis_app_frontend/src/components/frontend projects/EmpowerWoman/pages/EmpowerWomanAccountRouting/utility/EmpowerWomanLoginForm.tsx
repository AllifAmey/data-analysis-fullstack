import React, { useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Login } from "../../../../APIs/User";
import { GoSmiley } from "react-icons/go";

const EmpowerWomanLoginForm = () => {
  /*
  
  
  */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<any>({
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  //styles

  return (
    <>
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : (
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
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    borderColor="#83d0f5"
                    bg="#e9f7fe"
                    _placeholder={{ color: "#74b0da" }}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        email: e.target.value,
                      });
                      if (isError) {
                        setIsError(false);
                      }
                    }}
                  />
                  {isError && (
                    <FormErrorMessage>
                      There's an error somewhere
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isRequired isInvalid={isError}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    borderColor="#83d0f5"
                    bg="#e9f7fe"
                    _placeholder={{ color: "#74b0da" }}
                    onChange={(e) => {
                      setLoginDetails({
                        ...loginDetails,
                        pass: e.target.value,
                      });
                      if (isError) {
                        setIsError(false);
                      }
                    }}
                  />
                  {isError && (
                    <FormErrorMessage>
                      There's an error somewhere
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Flex>

              <Flex gap="8rem" paddingTop="2rem">
                <Button
                  w="100px"
                  as={RouterLink}
                  to={"/mimics/EmpowerWomanHome"}
                >
                  Back
                </Button>
                <Button
                  w="100px"
                  onClick={() => {
                    Login(setIsLoading, loginDetails).then((data) => {
                      if (
                        data.token === undefined &&
                        data.boss_woman === undefined
                      ) {
                        setIsError(true);
                        setLoginDetails({ email: "", password: "" });
                      } else if (data.boss_woman) {
                        navigate(
                          `/mimics/EmpowerWomanHome/account/admin/${loginDetails.email}`,
                          {
                            replace: true,
                          }
                        );
                      } else if (data.token !== undefined) {
                        navigate(
                          `/mimics/EmpowerWomanHome/account/member/${loginDetails.email}`,
                          {
                            replace: true,
                          }
                        );
                      }
                    });
                  }}
                >
                  Login
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default EmpowerWomanLoginForm;

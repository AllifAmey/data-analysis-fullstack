import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SignUp } from "../../../APIs/User";

const EmpowerWomanSignUpForm = () => {
  /*
  
  
  */

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [NoValidEmail, showNoValidEmail] = useState<boolean>(true);
  const [show, setShow] = React.useState(false);
  const [signUpDetails, setsignUpDetails] = useState<any>({
    firstName: "",
    lastName: "",
    pass: "",
    email: "",
  });
  const [fNameError, setFNameError] = useState<boolean>(false);
  const [lNameError, setLNameError] = useState<boolean>(false);
  const [passError, setPassError] = useState<boolean>(false);
  const [emailEmptyError, setEmailEmptyError] = useState<boolean>(false);

  const handleClick = () => setShow(!show);

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
              gap="2rem"
            >
              <Heading>Personal Details</Heading>
              <Flex gap="3rem">
                <FormControl isRequired isInvalid={fNameError}>
                  <FormLabel>First name</FormLabel>
                  <Input
                    placeholder="First name"
                    borderColor="#83d0f5"
                    bg="#e9f7fe"
                    _placeholder={{ color: "#74b0da" }}
                    onChange={(e) => {
                      setsignUpDetails({
                        ...signUpDetails,
                        firstName: e.target.value,
                      });
                      setFNameError(false);
                    }}
                  />
                  {signUpDetails.firstName !== "" ? (
                    <FormHelperText>Enter your first name.</FormHelperText>
                  ) : (
                    <FormErrorMessage>First name required</FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={lNameError}>
                  <FormLabel>Last name</FormLabel>
                  <Input
                    placeholder="Last name"
                    borderColor="#83d0f5"
                    bg="#e9f7fe"
                    _placeholder={{ color: "#74b0da" }}
                    onChange={(e) => {
                      setsignUpDetails({
                        ...signUpDetails,
                        lastName: e.target.value,
                      });
                      setLNameError(false);
                    }}
                  />
                  {signUpDetails.lastName !== "" ? (
                    <FormHelperText>Enter your last name.</FormHelperText>
                  ) : (
                    <FormErrorMessage>Last name required</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex gap="2rem">
                <FormControl isRequired w="500px" isInvalid={!NoValidEmail}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    placeholder="Email"
                    borderColor="#83d0f5"
                    bg="#e9f7fe"
                    _placeholder={{ color: "#74b0da" }}
                    onChange={(e) => {
                      if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                          e.target.value
                        )
                      ) {
                        showNoValidEmail(false);
                      } else {
                        showNoValidEmail(true);
                      }
                      setsignUpDetails({
                        ...signUpDetails,
                        email: e.target.value,
                      });
                    }}
                  />
                  {signUpDetails.email !== "" ? (
                    !NoValidEmail ? (
                      <FormErrorMessage>Email is invalid</FormErrorMessage>
                    ) : (
                      <FormHelperText>Correct email formatting.</FormHelperText>
                    )
                  ) : (
                    <FormErrorMessage>Email required</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex gap="2rem">
                <FormControl isRequired w="500px" isInvalid={passError}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      type={show ? "text" : "password"}
                      borderColor="#83d0f5"
                      bg="#e9f7fe"
                      _placeholder={{ color: "#74b0da" }}
                      onChange={(e) => {
                        setsignUpDetails({
                          ...signUpDetails,
                          pass: e.target.value,
                        });
                        setPassError(false);
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {signUpDetails.pass !== "" ? (
                    <FormHelperText>Enter a Password </FormHelperText>
                  ) : (
                    <FormErrorMessage>Password required</FormErrorMessage>
                  )}
                </FormControl>
              </Flex>
              <Flex gap="8rem" paddingTop="2rem">
                <Button
                  w="100px"
                  as={RouterLink}
                  to={"/frontend/EmpowerWomanHome"}
                >
                  Back
                </Button>
                <Button
                  w="100px"
                  onClick={() => {
                    let errorDetected = false;
                    if (signUpDetails.firstName == "") {
                      errorDetected = true;
                      setFNameError(true);
                    }
                    if (signUpDetails.lastName == "") {
                      errorDetected = true;
                      setLNameError(true);
                    }
                    if (signUpDetails.pass == "") {
                      errorDetected = true;
                      setPassError(true);
                    }
                    if (signUpDetails.email == "") {
                      errorDetected = true;
                      setEmailEmptyError(true);
                    }
                    if (errorDetected) {
                      return;
                    }

                    SignUp(setIsLoading, signUpDetails).then((_) => {
                      navigate(
                        `/mimics/EmpowerWomanHome/account/member/${signUpDetails.email}`,
                        {
                          replace: true,
                        }
                      );
                    });
                  }}
                >
                  Sign Up!
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default EmpowerWomanSignUpForm;

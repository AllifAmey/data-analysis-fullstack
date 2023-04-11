import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button } from "@chakra-ui/react";

/*
TODO: define the props 
type props = {
  example: string;
};

const MainBtnGroup = ({ example }: props) => {
*/

function MainBtnGroup(props: any) {
  /*
  Button group on the main
  
  */

  const btnStyles = { marginBottom: "2rem", padding: "20px" };

  return (
    <>
      <Button colorScheme="green" as={RouterLink} to="/" sx={btnStyles}>
        Back
      </Button>
      <Button
        colorScheme="green"
        as={RouterLink}
        to="/project/yellowsubhydro/seperate"
        sx={btnStyles}
      >
        Seperate Graphs
      </Button>
      <Button
        colorScheme="green"
        onClick={() => {
          props.inputGovData();
        }}
        sx={btnStyles}
      >
        Grab Data Now
      </Button>
    </>
  );
}

export default MainBtnGroup;

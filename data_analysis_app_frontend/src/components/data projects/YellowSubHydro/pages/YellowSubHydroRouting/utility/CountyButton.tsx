import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

/*
TODO: define the props 
type props = {
  example: string;
};

const CountyButton = ({ example }: props) => {
*/

function CountyButton(props: any) {
  /*
  
  */
  return (
    <>
      <Button
        colorScheme="teal"
        variant="link"
        as={RouterLink}
        to={`/project/yellowsubhydro/seperate/${props.county}`}
        sx={props.styles}
      >
        {props.county}
      </Button>
    </>
  );
}

export default CountyButton;

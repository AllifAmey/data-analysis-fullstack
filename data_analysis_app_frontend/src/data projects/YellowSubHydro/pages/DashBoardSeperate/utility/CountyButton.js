import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function CountyButton(props) {
  /*
  
  */
  return (
    <>
      <Button
        colorScheme="teal"
        variant="link"
        as={RouterLink}
        to={`/project/yellowsubhydro/seperate/${props.county}`}
      >
        {props.county}
      </Button>
    </>
  );
}

export default CountyButton;

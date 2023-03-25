import React, { useState } from "react";
import { Button } from "@chakra-ui/react";

import { useParams } from "react-router-dom";

function YellowSubHydroSeperate() {
  /*
  
  As each county is by default unique, I can grab the data from the YellowSubHydro,
  then input it into a graph and then onto a map to further impress the team which should,
  eviscerate any doubt to my skillset, work ethic and determination.
  
  */

  const params = useParams();
  return (
    <>
      <Button
        onClick={() => {
          console.log(params.county);
        }}
      >
        Click me
      </Button>
    </>
  );
}

export default YellowSubHydroSeperate;

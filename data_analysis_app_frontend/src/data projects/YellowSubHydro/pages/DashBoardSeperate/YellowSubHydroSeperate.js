import React, { useState, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function YellowSubHydroSeperate() {
  /*
  
  As each county is by default unique, I can grab the data from the YellowSubHydro,
  
  
  */

  const [dataset, setDataset] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const params = useParams();

  const { floodSeverityDataset, graphOptions, graphBottomlabel } = useSelector(
    (state) => state.YellowSubHydroData
  );

  useEffect(() => {
    const countyDataset = floodSeverityDataset.filter((data) => {
      if (data.label == params.county) {
        return true;
      }
    });
    setDataset(countyDataset);
    setIsLoading(false);
    console.log(countyDataset);
    console.log(graphBottomlabel);
  }, []);

  const data = {
    labels: graphBottomlabel,
    datasets: dataset,
  };

  const mainFlexStyles = {
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "50px",
  };

  return (
    <>
      {IsLoading ? (
        <div>Loading</div>
      ) : (
        <Flex sx={mainFlexStyles}>
          <Line options={graphOptions} data={data} />
          <Button
            width=" 70px"
            as={RouterLink}
            to="/project/yellowsubhydro/seperate"
          >
            Back
          </Button>
        </Flex>
      )}
    </>
  );
}

export default YellowSubHydroSeperate;

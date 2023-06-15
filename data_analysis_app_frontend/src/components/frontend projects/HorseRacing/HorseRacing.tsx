import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Flex, Button, Text, CircularProgress } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import domain from "../../../domain";

const HorseRacing = () => {
  /**
   * Display horse racing data
   *
   *
   */
  const [horseRaceData, setHorseRaceData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  //styles

  useEffect(() => {
    setIsLoading(true);
    fetch(`${domain}/api/horse-racing/`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
        } else {
          const horseData = response.json();
          return horseData;
        }
      })
      .then((data) => {
        setHorseRaceData(data);
      });
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <>
      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        h="100vh"
        backgroundColor="#293143"
        color="#fff"
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <>
            <Text fontSize="44">HorseRacing Data</Text>
            <Flex gap="4rem" justifyItems="space-between" alignItems="center">
              <Button colorScheme="cyan" as={RouterLink} to="/frontend">
                Back
              </Button>
              <Button
                colorScheme="cyan"
                onClick={(_) => {
                  console.log(horseRaceData);
                }}
              >
                Print Horse Data
              </Button>
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default HorseRacing;

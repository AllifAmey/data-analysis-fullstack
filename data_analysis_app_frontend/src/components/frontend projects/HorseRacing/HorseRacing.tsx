import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Flex, Button, Text, CircularProgress } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import domain from "../../../domain";

// utiliy
import RunnersRender from "./utility/RunnersRender";
import RacePrizeRender from "./utility/RacePrizeRender";

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

  const getRowId: any = useCallback((params: any) => {
    return params.data.race_name;
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizeable: true,
      sortable: true,
      flex: 1,
    }),
    []
  );
  console.log(defaultColDef);
  const gridRef: any = useRef();

  const columnDefs: any = [
    { field: "race_name", headerName: "Race Name", flex: 2 },
    {
      field: "race_prize",
      headerName: "Prizes to win!",
      comparator: (
        valueA: any,
        valueB: any,
        nodeA: any,
        nodeB: any,
        isDescending: any
      ) => valueA - valueB,
      cellRenderer: RacePrizeRender,
    },
    { field: "runners", cellRenderer: RunnersRender },
  ];

  return (
    <>
      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        h="120vh"
        backgroundColor="#293143"
        color="#fff"
      >
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <>
            <Text fontSize="44">HorseRacing Data</Text>
            <div
              className={"ag-theme-material"}
              style={{ height: 600, width: "80%" }}
            >
              <AgGridReact
                getRowId={getRowId}
                ref={gridRef}
                rowData={horseRaceData}
                animateRows={true}
                defaultColDef={defaultColDef}
                columnDefs={columnDefs}
              />
            </div>
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

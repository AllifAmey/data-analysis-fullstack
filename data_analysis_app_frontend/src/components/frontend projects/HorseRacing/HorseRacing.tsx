import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  Flex,
  Button,
  Text,
  CircularProgress,
  Select,
  Box,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

// utiliy
import RunnersRender from "./utility/RunnersRender";
import RacePrizeRender from "./utility/RacePrizeRender";
import { ValidRegionCodes } from "./utility/ValidateRegionCode";

// apis
import { getHorseData, postHorseData } from "./APIs/HorseAPI";

type AvailableRegionType = {
  region: string;
  region_code: string;
};

const HorseRacing = () => {
  /**
   * Display horse racing data
   *
   *
   */
  const [horseRaceData, setHorseRaceData] = useState<any>([]);
  const [region, setRegion] = useState<string>("Great Britain");
  const [availableRegions, setAvailableRegions] =
    useState<AvailableRegionType[]>(ValidRegionCodes);
  const [regionCode, setRegionCode] = useState<string>("gb");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  //styles

  useEffect(() => {
    getHorseData(setIsLoading, setError).then((horseData) => {
      const fetchedAvailableRegions = horseData.pop();
      const newAvailableRegions = ValidRegionCodes.filter(
        (val: AvailableRegionType) => {
          return fetchedAvailableRegions.includes(`${val.region_code}`);
        }
      );
      setAvailableRegions(newAvailableRegions);
      setHorseRaceData(horseData);
    });
  }, [setIsLoading]);

  const getRowId: any = useCallback((params: any) => {
    return params.data.race_name;
  }, []);

  const defaultColDef = useMemo(
    () => ({
      resizeable: true,
      sortable: true,
      editable: true,
      flex: 1,
    }),
    []
  );
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
            <Text fontSize="44">HorseRacing Data for {region}</Text>
            <Text fontSize="20">Using https://www.theracingapi.com/</Text>
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
                overlayNoRowsTemplate={`<span>${
                  error
                    ? "There's an error with the servers"
                    : "No available data for that region code. Try another one!"
                }</span>`}
              />
            </div>

            <Box w="40%">
              <Select
                placeholder={`${region} | ${regionCode}`}
                color="#66d9e8"
                value={regionCode}
                onChange={(e) => {
                  const regionSplit = e.target.value.split("|");
                  const regionCode = regionSplit[0];
                  const region = regionSplit[1];
                  setRegionCode(regionCode);
                  setRegion(region);
                  postHorseData(setIsLoading, setError, regionCode).then(
                    (newHorseData) => {
                      setHorseRaceData(newHorseData);
                    }
                  );
                }}
              >
                {availableRegions.map((validRegionCode: any) => {
                  return (
                    <option
                      value={`${validRegionCode.region_code}|${validRegionCode.region}`}
                    >
                      {`${validRegionCode.region_code} | ${validRegionCode.region}`}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Button colorScheme="cyan" as={RouterLink} to="/frontend">
              Back
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default HorseRacing;

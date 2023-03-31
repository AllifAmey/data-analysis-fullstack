import React, { useEffect, useState } from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import CustomLineGraph from "../../../VisualizationTools/CustomLineGraph";

import {
  getGovFloodArea,
  getGovFloodAreaPolygons,
} from "../../APIs/ExternalAPI/GovFloodAPI";

import mapboxgl from "mapbox-gl";

/* eslint import/no-webpack-loader-syntax: off */
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function YellowSubHydroIndividual() {
  const [dataset, setDataset] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [polygonType, setPolygonType] = useState(null);
  const [IsLoading, setIsLoading] = useState(true);

  const params = useParams();
  const api_key = process.env.REACT_APP_MAPBOX_API_KEY;

  const { floodSeverityDataset, graphOptions, graphBottomlabel } = useSelector(
    (state) => state.YellowSubHydroData
  );

  useEffect(() => {
    const countyDataset = floodSeverityDataset.filter((data) => {
      if (data.label == params.county) {
        return true;
      }
    });
    const recent_floodAreaIDs = countyDataset[0].recent_floodDataIDs;

    if (recent_floodAreaIDs == null) {
    } else {
      // potential error
      // Explanation:
      /*
      The logic states that it will loop over the floodareaids,
      then constantly update the state polygons yet at the same time
      if there are more than 1 floodareaids only the last one with its polygons are ,
      placed. 
      If my aim is to place all polygons found at each id then I should place every single one ,
      in a list not just one. 
      confirmed there is a bug. 
      
      */
      console.log(`recent_floodAreaIds below`);
      console.log(recent_floodAreaIDs);
      console.log("recent_floodAreaID above");
      for (const floodDataID of recent_floodAreaIDs) {
        getGovFloodArea(setIsLoading, floodDataID).then((data) => {
          setCoordinates({ lat: data.items.lat, long: data.items.long });
        });
        getGovFloodAreaPolygons(setIsLoading, floodDataID).then((data) => {
          const polygonType = data.features[0].geometry.type;
          const polygonCoordinates = data.features[0].geometry.coordinates;
          let polygonStore = undefined;

          if (polygonType == "MultiPolygon") {
            polygonStore = polygonCoordinates[0][0];
          } else if (polygonType == "Polygon") {
            polygonStore = polygonCoordinates[0];
          }
          setCoordinates({ lat: polygonStore[0][1], long: polygonStore[0][0] });
          console.log("polygonCoordinates is ");
          console.log(polygonCoordinates);
          console.log("polygonCoordinates above");
          setPolygon(polygonCoordinates);
          setPolygonType(polygonType);
        });
      }
    }
    setDataset(countyDataset);
    setIsLoading(false);
  }, []);

  console.log(polygon);

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
          <CustomLineGraph options={graphOptions} data={data} />
          {polygon !== null && (
            <Text fontSize="2xl">
              Look at where the flood severity data is on the map.
            </Text>
          )}

          {polygon == null ? (
            <Text fontSize="2xl">No recent data to plot onto a map.</Text>
          ) : (
            <Map
              initialViewState={{
                latitude: coordinates.lat,
                longitude: coordinates.long,
                zoom: 10,
              }}
              style={{ width: 800, height: 600 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={api_key}
            >
              <Source
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: polygonType,
                    coordinates: polygon,
                  },
                }}
              >
                <Layer
                  {...{
                    id: "data",
                    type: "fill",
                    paint: {
                      "fill-color": {
                        property: "percentile",
                        stops: [[0, "#3288bd"]],
                      },
                      "fill-opacity": 0.5,
                    },
                  }}
                />
              </Source>
              <Marker
                longitude={coordinates.long}
                latitude={coordinates.lat}
                color="red"
              />
            </Map>
          )}
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

export default YellowSubHydroIndividual;

import React, { useRef, useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
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

function YellowSubHydroSeperate() {
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
    console.log(countyDataset[0].recent_floodDataIDs);
    const recent_floodAreaIDs = countyDataset[0].recent_floodDataIDs;
    console.log(`${recent_floodAreaIDs} is recent`);

    if (recent_floodAreaIDs == null) {
    } else {
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
          setPolygon(polygonCoordinates);
          setPolygonType(polygonType);
        });
      }
    }

    setDataset(countyDataset);
    setIsLoading(false);
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
          <CustomLineGraph options={graphOptions} data={data} />
          {polygon == null ? (
            ""
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

export default YellowSubHydroSeperate;

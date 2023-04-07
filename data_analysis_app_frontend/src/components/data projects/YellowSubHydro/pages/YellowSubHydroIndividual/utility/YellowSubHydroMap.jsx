import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { getGovFloodAreaPolygons } from "../../../APIs/ExternalAPI/GovFloodAPI";

import mapboxgl from "mapbox-gl";

/* eslint import/no-webpack-loader-syntax: off */

//mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function YellowSubHydroMap(props) {
  /*
    flood severity level displayed on a map and marking different locations,
    of the areas with flood severity.
    */
  const [storeGeoJSON, setStoreGeoJSON] = useState(null);
  const [initialViewState, setInitialViewState] = useState(null);

  const params = useParams();
  const api_key = import.meta.env.VITE_MAPBOX_API_KEY;

  const { floodSeverityDataset } = useSelector(
    (state) => state.YellowSubHydroData
  );

  useEffect(() => {
    const countyDataset = floodSeverityDataset.filter((data) => {
      console.log(params.county);
      if (data.label == params.county) {
        console.log(data);
        return true;
      }
    });
    const recent_floodAreaIDs = countyDataset[0].recent_floodDataIDs;
    let temp_store = [];

    if (recent_floodAreaIDs == null) {
    } else {
      for (const floodDataID of recent_floodAreaIDs) {
        getGovFloodAreaPolygons(props.setIsLoading, floodDataID).then(
          (data) => {
            const polygonType = data.features[0].geometry.type;
            const polygonCoordinates = data.features[0].geometry.coordinates;
            let polygonStore = undefined;
            if (polygonType == "MultiPolygon") {
              polygonStore = polygonCoordinates[0][0];
            } else if (polygonType == "Polygon") {
              polygonStore = polygonCoordinates[0];
            }

            temp_store.push({
              key: temp_store.length.toString(),
              type: polygonType,
              coordinates: polygonCoordinates,
              lat: polygonStore[0][1],
              long: polygonStore[0][0],
            });

            setInitialViewState({
              lat: polygonStore[0][1],
              long: polygonStore[0][0],
            });
          }
        );
      }
    }

    setStoreGeoJSON(temp_store);
    props.setIsLoading(false);
  }, [floodSeverityDataset, props, params.county]);
  /*
  
  
  */
  return (
    <>
      {storeGeoJSON !== null && initialViewState !== null && (
        <Map
          initialViewState={{
            latitude: initialViewState.lat,
            longitude: initialViewState.long,
            zoom: 10,
          }}
          style={{ width: 800, height: 600 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={api_key}
        >
          {storeGeoJSON.map((geoJSON) => {
            return (
              <Source
                key={geoJSON.key}
                type="geojson"
                data={{
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: geoJSON.type,
                    coordinates: geoJSON.coordinates,
                  },
                }}
              >
                <Layer
                  {...{
                    id: geoJSON.key,
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
            );
          })}
          {storeGeoJSON.map((geoJSON) => {
            return (
              <Marker
                longitude={geoJSON.long}
                latitude={geoJSON.lat}
                color="red"
              />
            );
          })}
        </Map>
      )}
    </>
  );
}

export default YellowSubHydroMap;
import React, { useState, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";

import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  getGovFloodArea,
  getGovFloodAreaPolygons,
} from "../../APIs/ExternalAPI/GovFloodAPI";

function YellowSubHydroSeperate() {
  /*
  
  As each county is by default unique, I can grab the data from the YellowSubHydro,
  
  The plan for this would be to plot the data on the graph:

  Add a polygon - 
  https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/

  https://developers.google.com/maps/documentation/javascript/examples/polygon-simple 
  Look into the Python script to see a piece of real polygon data that I will work with.

  https://jsfiddle.net/aqcyjztg/1/
  
  Solution - 

  Point to a random polgon that is less than 10
  Use google maps to draw the polygon. 
  
  Here's the final solution to putting a map after analysing data enough. -
  
  Each item has a url that can be called on to get coordinate data.
  Store each item's url into the model
  Use that piece of data to call on it when on this page.
  Then from this page grab the basic coordinate.
  It is also in that piece of data, the polygon coordinates.
  Grab the url then do another fetch get request and then go to coordinate section.
  If there is a polygon that is less than 10 then pick the highest out of those polygons less than 10.

  From there draw that one polygon on google maps. 

  If there is no polygon less than 10 just return no polygons of crunchable size.

  To do list - 

  1. Get the "floodAreaID" and store it in floodAreaID field name and charfield max_length(255)
  2. `http://environment.data.gov.uk/flood-monitoring/id/floodAreas/${floodAreaID}` get fetch request
  3. Grab the lat and long and put store it in useState
  4. `http://environment.data.gov.uk/flood-monitoring/id/floodAreas/${floodAreaID}/polygon` get fetch request.
  5. Go through the coordinates and find a polygon that is less than 10 length in coordinates.
  6. Grab the highest of the polygons found less than 10 and input it.
  7. Direct the original lat and long if coordinates are not found.
  8. Else direct the first coordinate of the polygon used to showcase the polygon.
  
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
    console.log(countyDataset[0].recent_floodDataIDs);
    const recent_floodAreaIDs = countyDataset[0].recent_floodDataIDs;

    for (const floodDataID of recent_floodAreaIDs) {
      getGovFloodArea(setIsLoading, floodDataID).then((data) => {
        let relevantData = {};
        relevantData.lat = data.items.lat;
        relevantData.long = data.items.long;
      });
      getGovFloodAreaPolygons(setIsLoading, floodDataID).then((data) => {
        const polygonType = data.features[0].geometry.type;
        const polygonCoordinates = data.features[0].geometry.coordinates;
        let polygonStore = undefined;

        // get the first polygon that is less than 20 in length
        if (polygonType == "MultiPolygon") {
          for (const polygon of polygonCoordinates) {
            if (polygon[0].length <= 20) {
              polygonStore = polygon[0];
              break;
            }
          }
        } else if (polygonType == "Polygon") {
          for (const polygon of polygonCoordinates) {
            if (polygon.length <= 20) {
              polygonStore = polygon;
              break;
            }
          }
        }

        console.log(polygonStore);
      });
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

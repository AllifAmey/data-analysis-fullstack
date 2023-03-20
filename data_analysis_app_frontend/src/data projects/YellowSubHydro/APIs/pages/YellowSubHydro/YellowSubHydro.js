import React, { useState } from "react";

function YellowSubHydro() {
  /*
  The way this is going to work:
  Grab data from http://environment.data.gov.uk/flood-monitoring/id/floods
  In each item:
  Get the county
  get the severity level
  Place that model into a 
  Call that api every 15 minutes using

  I may or may not parse all of the data but I will try a few in the beginning.

  The aim is to plot these on a graph and to explain where each datapoint comes from.

  sales pitch: 

  The goal here is to track severity levels across different parts of the country - 
  this will allow the government or other planners to know when to evacuate people,
  in the event of severe floading as they can easily see it on 
  
  */
  return (
    <>
      <div>
        this uses Environment Agency flood and river level data from the
        real-time data API (Beta)
      </div>
    </>
  );
}

export default YellowSubHydro;

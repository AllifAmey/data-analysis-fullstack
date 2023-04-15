import React from "react";

// note on types decision:
// I have absolutely no control over external api so can't guarantee,
// the data structure. Typescript will have no choice but to infer.

export async function getGovFlood(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> {
  // Grabs the GovFloodData
  setIsLoading(true);
  const response = await fetch(
    `https://environment.data.gov.uk/flood-monitoring/id/floods`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  setIsLoading(false);
  return data;
}
// `http://environment.data.gov.uk/flood-monitoring/id/floodAreas/${floodAreaID}`
export async function getGovFloodArea(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  floodAreaID: string
): Promise<any> {
  // Grabs the GovFloodData using the flood id
  setIsLoading(true);
  const response = await fetch(
    `https://environment.data.gov.uk/flood-monitoring/id/floodAreas/${floodAreaID}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  setIsLoading(false);
  return data;
}

export async function getGovFloodAreaPolygons(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  floodAreaID: string
): Promise<any> {
  // Grabs the GovFloodData using the flood id
  setIsLoading(true);
  const response = await fetch(
    `https://environment.data.gov.uk/flood-monitoring/id/floodAreas/${floodAreaID}/polygon`,
    {
      method: "GET",
    }
  );

  const data = await response.json();

  setIsLoading(false);
  return data;
}

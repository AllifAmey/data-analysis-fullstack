export async function getGovFlood(setIsLoading) {
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
export async function getGovFloodArea(setIsLoading, floodAreaID) {
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

export async function getGovFloodAreaPolygons(setIsLoading, floodAreaID) {
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

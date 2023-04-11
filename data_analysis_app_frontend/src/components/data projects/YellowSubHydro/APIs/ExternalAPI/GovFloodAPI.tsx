// TODO: define all the functions and maybe return of the function

export async function getGovFlood(setIsLoading: any): Promise<any> {
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
  setIsLoading: any,
  floodAreaID: any
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
  setIsLoading: any,
  floodAreaID: any
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

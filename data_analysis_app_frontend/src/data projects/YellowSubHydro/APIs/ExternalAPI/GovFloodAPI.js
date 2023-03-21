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

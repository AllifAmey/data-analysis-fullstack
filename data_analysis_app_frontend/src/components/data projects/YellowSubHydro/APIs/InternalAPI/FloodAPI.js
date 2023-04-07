import domain from "../../../../../domain";

export async function getFlood(setIsLoading) {
  // Grabs the stored flood data from the INTERNAL API not the url
  setIsLoading(true);
  const response = await fetch(`${domain}/api/flood/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  setIsLoading(false);
  return data;
}

export async function postFlood(setIsLoading, gov_flood_data) {
  // Post the Gov Flood Data into the INTERNAL API.
  setIsLoading(true);
  const response = await fetch(`${domain}/api/flood/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(gov_flood_data),
  });
  const data = await response.json();
  setIsLoading(false);

  return data;
}
export async function getFlood(setIsLoading) {
  // gets the calculated data and data for each dataset
  setIsLoading(true);
  const response = await fetch(`http://localhost:8000/api/flood/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  setIsLoading(false);
  return data;
}

export async function postFlood(setIsLoading) {
  // Grabs the stored flood data from the INTERNAL API not the url
  const response = await fetch(`http://localhost:8000/api/datapoint/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();

  return data;
}

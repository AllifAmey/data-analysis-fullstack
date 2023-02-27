export async function getAnalysis(setIsLoading) {
  // gets the calculated data
  setIsLoading(true);
  const response = await fetch(`http://localhost:8000/api/datapoint/analysis`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  setIsLoading(false);
  return data;
}

export async function getAnalysis(setIsLoading) {
  // gets the calculated data and data for each dataset
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

export async function postRandom(
  setIsLoading,
  dataset_id,
  action_type,
  setdataset1Data,
  setdataset2Data,
  setdatasetAnalysis1,
  setdatasetAnalysis2
) {
  // Allows functionality for the add 5, delete 5 , bulk delete buttons.

  setIsLoading(true);
  const response = await fetch(`http://localhost:8000/api/datapoint/random`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      dataset_id: dataset_id,
      action_type: action_type,
    }),
  });

  const Analysisresponse = await fetch(
    `http://localhost:8000/api/datapoint/analysis`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const analysis = await Analysisresponse.json();

  setdatasetAnalysis1(analysis.data.dataset_1_analysis);
  setdatasetAnalysis2(analysis.data.dataset_2_analysis);
  setdataset1Data(analysis.data.dataset_1_data);
  setdataset2Data(analysis.data.dataset_2_data);

  setIsLoading(false);
  return analysis;
}

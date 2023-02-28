export async function getAnalysis(
  setIsLoading,
  setdataset1Data,
  setdataset2Data,
  setdatasetAnalysis1,
  setdatasetAnalysis2
) {
  // gets the calculated data and data for each dataset
  setIsLoading(true);
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

export async function getDatasetSpecific(setIsLoading, dataset_id) {
  // provides all of the data attached to each datapoint
  // this allows for the data to be patched or specifically deleted.
  setIsLoading(true);
  const response = await fetch(`http://localhost:8000/api/datapoint/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  setIsLoading(false);
  return data[`dataset_${dataset_id}`];
}

export async function postDatapoint(setIsLoading, dataset_id, datapoint_val) {
  // provides all of the data attached to each datapoint
  // this allows for the data to be patched or specifically deleted.
  const response = await fetch(`http://localhost:8000/api/datapoint/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      dataset: dataset_id,
      data: datapoint_val,
    }),
  });
  const data = await response.json();

  return data;
}

export async function patchDatapoint(
  setIsLoading,
  datapoint_id,
  dataset_id,
  datapoint_val
) {
  // provides all of the data attached to each datapoint
  // this allows for the data to be patched or specifically deleted.
  const response = await fetch(
    `http://localhost:8000/api/datapoint/${datapoint_id}/`,
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        dataset: dataset_id,
        data: datapoint_val,
      }),
    }
  );
  const data = await response.json();

  return data;
}

export async function deleteDatapoint(setIsLoading, datapoint_id) {
  // provides all of the data attached to each datapoint
  // this allows for the data to be patched or specifically deleted.
  const response = await fetch(
    `http://localhost:8000/api/datapoint/${datapoint_id}/`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}

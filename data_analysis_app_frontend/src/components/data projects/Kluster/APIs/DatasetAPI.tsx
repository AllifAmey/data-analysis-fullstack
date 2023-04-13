import React from "react";
import domain from "../../../../domain";

export async function getAnalysis(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setdataset1Data: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdataset2Data: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdatasetAnalysis1: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdatasetAnalysis2: React.Dispatch<React.SetStateAction<number[] | null>>
): Promise<any> {
  // gets the calculated data and data for each dataset
  setIsLoading(true);
  const Analysisresponse = await fetch(`${domain}/api/datapoint/analysis`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });

  const analysis = await Analysisresponse.json();

  setdatasetAnalysis1(analysis.data.dataset_1_analysis);
  setdatasetAnalysis2(analysis.data.dataset_2_analysis);
  setdataset1Data(analysis.data.dataset_1_data);
  setdataset2Data(analysis.data.dataset_2_data);

  setIsLoading(false);
  return analysis;
}

export async function postRandom(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataset_id: number,
  action_type: string,
  setdataset1Data: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdataset2Data: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdatasetAnalysis1: React.Dispatch<React.SetStateAction<number[] | null>>,
  setdatasetAnalysis2: React.Dispatch<React.SetStateAction<number[] | null>>
): Promise<any> {
  // Allows functionality for the add 5, delete 5 , bulk delete buttons.
  // by connecting to the Random API

  setIsLoading(true);
  const response = await fetch(`${domain}/api/datapoint/random`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      dataset_id: dataset_id,
      action_type: action_type,
    }),
  });

  const Analysisresponse = await fetch(`${domain}/api/datapoint/analysis`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const analysis = await Analysisresponse.json();

  setdatasetAnalysis1(analysis.data.dataset_1_analysis);
  setdatasetAnalysis2(analysis.data.dataset_2_analysis);
  setdataset1Data(analysis.data.dataset_1_data);
  setdataset2Data(analysis.data.dataset_2_data);

  setIsLoading(false);
  return analysis;
}

export async function getDatasetSpecific(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataset_id: number
): Promise<any> {
  // grabs all the data points and gives specific dataset data
  // in the return statement.
  setIsLoading(true);
  const response = await fetch(`${domain}/api/datapoint/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  setIsLoading(false);
  // the returned data is {"dataset_1" : number[], "dataset_2": number[]}
  // That is why data[`dataset_${dataset_id}`] is called ,
  // to get the specific dataset I want
  return data[`dataset_${dataset_id}`];
}

export async function postDatapoint(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataset_id: number | boolean,
  datapoint_val: string
): Promise<any> {
  // A new datapoint is created by sending a POST request.
  const response = await fetch(`${domain}/api/datapoint/`, {
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
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  datapoint_id: number | undefined,
  dataset_id: number | undefined,
  datapoint_val: string
): Promise<any> {
  // A datapoint is edited by sending a patch request with the datapoint id
  const response = await fetch(`${domain}/api/datapoint/${datapoint_id}/`, {
    method: "PATCH",
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

export async function deleteDatapoint(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  datapoint_id: number
): Promise<any> {
  // Deletes specific datapoints using the datapoint_id
  const response = await fetch(`${domain}/api/datapoint/${datapoint_id}/`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

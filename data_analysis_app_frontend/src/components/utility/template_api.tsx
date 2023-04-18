import React from "react";
import domain from "../../domain";

// template to create apis

export async function getTemplate(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  dataset_id: any,
  datapoint_val: any
): Promise<any> {
  const response = await fetch(`${domain}/api/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await response.json();

  return data;
}

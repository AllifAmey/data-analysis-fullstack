import React from "react";
import domain from "../../../../domain";

export async function getHorseData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> {
  setIsLoading(true);
  const response = await fetch(`${domain}/api/horse-racing/`);
  if (!response.ok) {
    setError(true);
    setIsLoading(false);
    return [];
  } else {
    const horseData = response.json();
    setIsLoading(false);
    setError(false);
    return horseData;
  }
}

export async function postHorseData(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<boolean>>,
  regionCode: string
): Promise<any> {
  setIsLoading(true);
  const response = await fetch(`${domain}/api/horse-racing/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      region_code: regionCode,
    }),
  });
  if (!response.ok) {
    console.log("error here!");
    setError(true);
    setIsLoading(false);
    return [];
  } else {
    const horseData = response.json();
    setIsLoading(false);
    setError(false);
    return horseData;
  }
}

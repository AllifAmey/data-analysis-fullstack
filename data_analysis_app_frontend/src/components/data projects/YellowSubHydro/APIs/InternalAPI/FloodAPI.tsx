import domain from "../../../../../domain";

// PostFloodData is repeated add to models
interface PostFloodData {
  floodAreaID: string;
  county: string;
  flood_severity_lvl: number;
}

interface internalFloodData extends PostFloodData {
  id: number;
  creation_date: string;
}

export async function getFlood(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<internalFloodData[]> {
  // Grabs the stored flood data from the INTERNAL API not the url
  setIsLoading(true);
  const response = await fetch(`${domain}/api/flood/`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data: internalFloodData[] = await response.json();

  setIsLoading(false);
  return data;
}

export async function postFlood(
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  gov_flood_data: PostFloodData[]
): Promise<void> {
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
}

export function ParseData(data) {
  // parse the data for now it's on the client side.
  let unique_vals_creation_date = [
    ...new Set(data.map((x) => x.creation_date)),
  ];
  unique_vals_creation_date.sort((a, b) => {
    // due to the way I formatted time in the backend,
    // I have to use a bit more of a complicated way to sort the data correctly.
    // extract the key informtion and place it into Date then sort it
    // momentjs dayjs
    const aTime = {
      day: a.substr(0, 2),
      month: a.substr(3, 2),
      hour: a.substr(6, 2),
      minute: a.substr(9, 2),
    };
    const bTime = {
      day: b.substr(0, 2),
      month: b.substr(3, 2),
      hour: b.substr(6, 2),
      minute: b.substr(9, 2),
    };
    const dateA = new Date(
      Date.parse(
        `${aTime.month}/${aTime.day}/${new Date().getFullYear()} ${
          aTime.hour
        }:${aTime.minute}`
      )
    );
    const dateB = new Date(
      Date.parse(
        `${bTime.month}/${bTime.day}/${new Date().getFullYear()} ${
          bTime.hour
        }:${bTime.minute}`
      )
    );
    return dateA - dateB;
  });

  let unique_vals_counties = [...new Set(data.map((x) => x.county))];

  const entireDataset = [];
  for (const county of unique_vals_counties) {
    const filtered_county = data.filter((datapoint) => {
      return datapoint.county == county;
    });
    // initial_data_time are filled with arrays up to the length of creation-date
    // this is so that data can be plotted in the next piece of logic.
    let initial_data_time = Array(unique_vals_creation_date.length).fill(null);
    for (const filtered_county_data of filtered_county) {
      // the index of the creation_date in relation to unique_creation date is detected
      // this is then used to know where the data should be plotted on the graph.

      const data_time_index = unique_vals_creation_date.indexOf(
        filtered_county_data.creation_date
      );
      initial_data_time[data_time_index] =
        filtered_county_data.flood_severity_lvl;
    }
    // border colours are randomised between 0, 249
    // the background colours are added plus 5 so the max it could be 254
    // this doesn't break the rgb colour thing.
    // Temporary measure but necessary measure so values can be uniquely identified.
    const r = Math.floor(Math.random() * 250);
    const g = Math.floor(Math.random() * 250);
    const b = Math.floor(Math.random() * 250);
    let recent_floodDataIDs = null;
    const has_recent_data = initial_data_time[initial_data_time.length - 1];
    const recent_time =
      unique_vals_creation_date[unique_vals_creation_date.length - 1];

    if (has_recent_data != null) {
      // grab the recent filtered_county filter.
      recent_floodDataIDs = [];
      const recent_data = filtered_county.filter((e) => {
        return e.creation_date == recent_time;
      });

      for (const data of recent_data) {
        recent_floodDataIDs.push(data.floodAreaID);
      }
    }

    entireDataset.push({
      recent_floodDataIDs: recent_floodDataIDs,
      label: county,
      data: initial_data_time,
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgb(${r + 5}, ${g + 5}, ${b + 5})`,
    });
  }
  return [unique_vals_creation_date, entireDataset];
}

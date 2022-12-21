import fetcher from "./fetcher";

const locationsAPI = {
  getLocations: () => {
    return fetcher.get("api/vi-tri");
  },
};

export default locationsAPI;

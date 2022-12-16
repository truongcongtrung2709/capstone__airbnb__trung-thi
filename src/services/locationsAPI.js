import fetcher from "./fetcher";

const locationsAPI = {
  getLocations: () => {
    return fetcher.get("https://airbnbnew.cybersoft.edu.vn/api/vi-tri");
  },
};

export default locationsAPI;

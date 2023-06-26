import axios from "axios";
const fetcher = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0MyIsIkhldEhhblN0cmluZyI6IjA0LzExLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY5OTA1NjAwMDAwMCIsIm5iZiI6MTY2OTQ4MjAwMCwiZXhwIjoxNjk5MjAzNjAwfQ.7A1g8RqPPK_ttr9NYitsWT7Cbe11nz4qye-QxZ_b8fk",
  },
});

fetcher.interceptors.response.use(
  // (request) =>{
  //   return
  // },
  (response) => {
    return response.data.content;
  },
  (error) => {
    return Promise.reject(error.response.data.content);
  }
);
fetcher.interceptors.request.use(
  (config) => {
    // Thêm Key Authorization vào header config (nếu có)
    const { token } = JSON.parse(localStorage.getItem("user")) || {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fetcher;

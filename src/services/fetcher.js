import axios from "axios";
const fetcher = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/",
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTY4OTYwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxODM3MjAwfQ.Yk1H5QCjda1n9Cd5-k2yU_DLnRqRvaB7FIkn1hIuPE0",
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

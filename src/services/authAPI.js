import fetcher from "./fetcher";

const authAPI = {
  signin: (values) => {
    return fetcher.post("api/auth/signin", values);
  },
  signup: (values) => {
    return fetcher.post("api/auth/signup", values);
  },

};
export default authAPI;

import fetcher from "./fetcher";

const authAPI = {
  signin: (values) => {
    return fetcher.post("api/auth/signin", values);
  },
  signup: (values) => {
    return fetcher.post("api/auth/signup", values);
  },
  uploadAvatar: (avatar) => {
    return fetcher.post("api/users/upload-avatar", avatar);
  },
};
export default authAPI;

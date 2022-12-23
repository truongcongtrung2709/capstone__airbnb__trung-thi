import fetcher from "./fetcher";

const usersAPI = {
 
  getUserbyId: (userId) => {
    return fetcher.get(`api/users/${userId}`)
  },
    
  uploadAvatar: (avatar) => {
    return fetcher.post("api/users/upload-avatar", avatar);
  },
  updateUser: (userId) => {
    return  fetcher.put(`api/users/${userId}`);
  }
}
export default usersAPI;

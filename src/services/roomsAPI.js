import fetcher from "./fetcher";

const roomsAPI = {
    getRoomByUser: (user) => {
        return fetcher.get(`api/dat-phong/lay-theo-nguoi-dung/${user.id}`,user)
    }
};

export default roomsAPI;

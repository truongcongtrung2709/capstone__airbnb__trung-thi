import fetcher from "./fetcher";

const roomsAPI = {
  getRoomByUser: (user) => {
    return fetcher.get(`api/dat-phong/lay-theo-nguoi-dung/${user}`);
  },
  getRoomByLocation: (maViTri) => {
    return fetcher.get(`api/phong-thue/lay-phong-theo-vi-tri`, {
      params: {
        maViTri: maViTri,
      },
    });
  },
  postPaidRoom: (values) => {
    return fetcher.post("api/dat-phong", values);
  },
};

export default roomsAPI;

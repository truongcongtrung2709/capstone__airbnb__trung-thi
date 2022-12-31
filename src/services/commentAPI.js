import fetcher from "./fetcher";

const commentsAPI = {
  getCommentsById: (roomId) => {
    return fetcher.get(`api/binh-luan/lay-binh-luan-theo-phong/${roomId}`);
  },
  postComment: (values) => {
    return fetcher.post("api/binh-luan", values);
  },
};

export default commentsAPI;

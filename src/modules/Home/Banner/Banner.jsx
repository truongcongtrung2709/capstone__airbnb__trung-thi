import React from "react";
import bannerImg from "./bannerImg.png";
import "./banner.scss";
const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__container">
        <img src={bannerImg} alt="" />
        <h1>Nhờ Có Host, Mọi Điều Đều Có Thể</h1>
      </div>
    </div>
  );
};

export default Banner;

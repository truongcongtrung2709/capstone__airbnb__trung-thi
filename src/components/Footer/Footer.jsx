import React from "react";
import "./footer.scss";

import { RiGlobalLine } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__menu">
            <div className="intro">
              <ul>
                <li>
                  <h6>GIỚI THIỆU</h6>
                </li>
                <li>
                  <a href="#">Phương thức hoạt động của Airbnb</a>
                </li>
                <li>
                  <a href="#">Trang tin tức</a>
                </li>
                <li>
                  <a href="#">Nhà đầu tư</a>
                </li>
                <li>
                  <a href="#">Airbnb Plus</a>
                </li>
                <li>
                  <a href="#">Airbnb Luxe</a>
                </li>
                <li>
                  <a href="#">HotelTonight</a>
                </li>
                <li>
                  <a href="#">Airbnb for Work</a>
                </li>
                <li>
                  <a href="#">Nhờ có Host, mọi điều đều có thể</a>
                </li>
                <li>
                  <a href="#">Cơ hội nghề nghiệp</a>
                </li>
                <li>
                  <a href="#">Thư của nhà sáng lập</a>
                </li>
              </ul>
            </div>
            <div className="comunity">
              <ul>
                <li>
                  <h6>CỘNG ĐỒNG</h6>
                </li>
                <li>
                  <a href="#">Sự đa dạng và cảm giác thân thuộc</a>
                </li>
                <li>
                  <a href="#">Tiện nghi phù hợp cho người khuyết tật</a>
                </li>
                <li>
                  <a href="#">Đối tác liên kết Airbnb</a>
                </li>
                <li>
                  <a href="#">Chỗ ở cho tuyến đầu</a>
                </li>
                <li>
                  <a href="#">Lượt giới thiệu của khách</a>
                </li>
                <li>
                  <a href="#">Airbnb.org</a>
                </li>
              </ul>
            </div>
            <div className="welcome">
              <ul>
                <li>
                  <h6>ĐÓN TIẾP KHÁCH</h6>
                </li>
                <li>
                  <a href="">Cho thuê nhà</a>
                </li>
                <li>
                  <a href="">Tổ chức trải nghiệm trực tuyến</a>
                </li>
                <li>
                  <a href="">Tổ chức trải nghiệm</a>
                </li>
                <li>
                  <a href="">Đón tiếp khách có trách nhiệm</a>
                </li>
                <li>
                  <a href="">Trung tâm tài nguyên</a>
                </li>
                <li>
                  <a href="">Trung tâm cộng đồng</a>
                </li>
              </ul>
            </div>
            <div className="suport">
              <ul>
                <li>
                  <h6>HỖ TRỢ</h6>
                </li>
                <li>
                  <a href="">
                    Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi
                  </a>
                </li>
                <li>
                  <a href="">Trung tâm trợ giúp</a>
                </li>
                <li>
                  <a href="">Các tùy chọn hủy</a>
                </li>
                <li>
                  <a href="">Hỗ trợ khu dân cư</a>
                </li>
                <li>
                  <a href="">Tin cậy và an toàn</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__copyright">
            <div className="copy__text col-10">
              <span>© 2021 Airbnb, Inc, All rights reserved</span>
              <span>
                <a href="">. Quyền riêng tư</a>
              </span>
              <span>
                <a href="">. Điều khoản</a>
              </span>
              <span>
                <a href="">. Sơ đồ trang web</a>
              </span>
            </div>
            <div className="social col-2">
              <span>
                <a href="" className="px-3">
                  <RiGlobalLine />
                  Tiếng Việt(VN)
                </a>
              </span>
              <span>
                <a href="" className="px-1">
                  $ USD
                </a>
              </span>
              <span>
                <a href="" className="px-1">
                  <FaFacebookF />
                </a>
              </span>
              <span>
                <a href="" className="px-1">
                  <AiOutlineTwitter />
                </a>
              </span>
              <span>
                <a href="" className="px-1">
                  <TiSocialInstagram />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

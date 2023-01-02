import React, { useEffect, useState } from "react";
//react-icons
import { useLocation } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsPersonFill } from "react-icons/bs";
import { FiShare } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlineIron } from "react-icons/md";
import { MdOutlineAirplay } from "react-icons/md";
import { MdOutlineAir } from "react-icons/md";
import { AiOutlineWifi } from "react-icons/ai";
import { AiFillCar } from "react-icons/ai";
import { MdPool } from "react-icons/md";

import commentAPI from "../../services/commentAPI";
import "./rentDetail.scss";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Total from "./Total/Total";

const RentDetail = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const room = location.state.room;
  const [comments, setComments] = useState([]);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  useEffect(() => {
    (async () => {
      try {
        const data = await commentAPI.getCommentsById(room.id);
        setComments(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      maPhong: "",
      maNguoiBinhLuan: "",
      ngayBinhLuan: "",
      noiDung: "",
      saoBinhLuan: "",
    },
    mode: "onTouuched",
  });

  const onSubmit = async (values) => {
    const newValues = {
      maPhong: room.id,
      maNguoiBinhLuan: user.user.id,
      ngayBinhLuan: date,
      noiDung: values.noiDung,
    };
    console.log(newValues);
    await commentAPI.postComment(newValues);
    window.location.reload(true);
  };
  return (
    <div className="room">
      <div className="room__container">
        <div className="room__container__content">
          <div className="room__container__content__info">
            <h1 className="title">{room.tenPhong}</h1>
            <div className="review ">
              <div className="review__left  ">
                <p className="review__left__vote  ">
                  <AiFillStar /> <span>5</span>
                  <span> (20 Đánh giá)</span>
                </p>
                <p className="review__left__owner  ">
                  <BsPersonFill /> <span>Chủ nhà siêu cấp</span>
                </p>
              </div>
              <div className="review__right  ">
                <p className="review__right__share  ">
                  <FiShare /> <span>Chia sẻ</span>
                </p>
                <p className="review__right__save  ">
                  <AiOutlineHeart />
                  Lưu
                </p>
              </div>
            </div>
            <img src={room.hinhAnh} alt={room.tenPhong} width="100%" />
          </div>
          <div className="room__container__content__des-booking">
            <div className="des">
              <div className="des-owner">
                <div className="des-owner__left">
                  <h2 className="des-owner__left__title">
                    Thông tin toàn bộ căn hộ
                  </h2>
                  <p className="des-owner__left__funiture">
                    {room.khach} khách - {room.giuong} giường - {room.phongTam}{" "}
                    phòng tắm
                  </p>
                </div>
                <div className="des-owner__right">
                  <BsPersonFill />
                </div>
              </div>
              <div className="des-room">
                <div className="des-room__rules">
                  <p>{room.moTa}</p>
                </div>
              </div>
              <div className="des-conven">
                <h2>Tiện Nghi</h2>
                <ul>
                  {room.mayGiat === true ? (
                    <li>
                      <GiWashingMachine />
                      Máy Giặt
                    </li>
                  ) : (
                    ""
                  )}
                  {room.banLa === true ? (
                    <li>
                      <MdOutlineIron />
                      Bàn Là
                    </li>
                  ) : (
                    ""
                  )}
                  {room.tivi === true ? (
                    <li>
                      <MdOutlineAirplay />
                      Ti Vi
                    </li>
                  ) : (
                    ""
                  )}
                  {room.dieuHoa === true ? (
                    <li>
                      <MdOutlineAir />
                      Điều Hòa
                    </li>
                  ) : (
                    ""
                  )}
                  {room.wifi === true ? (
                    <li>
                      <AiOutlineWifi />
                      Wifi
                    </li>
                  ) : (
                    ""
                  )}
                  {room.doXe === true ? (
                    <li>
                      <AiFillCar />
                      Đỗ Xe
                    </li>
                  ) : (
                    ""
                  )}
                  {room.hoBoi === true ? (
                    <li>
                      <MdPool />
                      Hồ Bơi
                    </li>
                  ) : (
                    ""
                  )}
                  {room.banUi === true ? (
                    <li>
                      <MdOutlineIron />
                      Bàn Ủi
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
              <hr />
            </div>
            <Total room={room} user={user} />
          </div>
          <div className="room__container__content__comments">
            {comments.map((comment, index) => (
              <div className="reviewer" key={index}>
                <div className="info">
                  <div className="avatar">
                    <img src={comment.avatar} alt="" />
                  </div>
                  <div className="name-date">
                    <h6>{comment.tenNguoiBinhLuan}</h6>
                    <p>{comment.ngayBinhLuan}</p>
                  </div>
                </div>
                <div className="des">
                  <p>{comment.noiDung}</p>
                </div>
              </div>
            ))}
            <form className="comment" onSubmit={handleSubmit(onSubmit)}>
              <div className="avatar-input">
                <img src={user.user.avatar} alt="" width="40px" />
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  {...register("noiDung")}
                ></textarea>
              </div>
              <button className=" btn-comment">Bình Luận</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetail;

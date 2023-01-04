import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import roomsAPI from "../../../services/roomsAPI";
import DatePicker from "react-date-picker";
import "./total.scss";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const Total = ({ room }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
  const dayjsCheckInValue = dayjs(checkInValue);
  const dayjsCheckOutValue = dayjs(checkOutValue);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
  });
  const onSubmit = async (values) => {
    try {
      if (user === null || user === undefined) {
        alert("Bạn phải đăng nhập");
        return navigate("/signin");
      } else {
        const dayjsCheckInValue = dayjs(checkInValue).format(
          "YYYY-MM-DDTHH:mm:ssZ[Z]"
        );
        const dayjsCheckOutValue = dayjs(checkOutValue).format(
          "YYYY-MM-DDTHH:mm:ssZ[Z]"
        );
        const newValues = {
          maPhong: room.id,
          ngayDen: dayjsCheckInValue,
          ngayDi: dayjsCheckOutValue,
          soLuongKhach: values.soLuongKhach,
          maNguoiDung: user.user.id,
        };
        console.log(newValues);
        await roomsAPI.postPaidRoom(newValues);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="booking col-lg-6">
      <div className="booking__content">
        <div className="price-review">
          <p className="price">
            <span>${room.giaTien}</span>/ đêm
          </p>
          <p className="review">
            <AiFillStar /> <span className="star-num">5</span>
            <span className="review-num">(18 Đánh Giá)</span>
          </p>
        </div>
        <form className="paid-form">
          <div className="check-in-out row">
            <div className="checkin col-lg-6">
              <label htmlFor="">Nhận Phòng</label>
              <DatePicker
                autoFocus={false}
                format="yyyy-MM-dd"
                locale="vi-VI"
                calendarIcon={false}
                clearIcon={false}
                onChange={setCheckInValue}
                value={checkInValue}
                minDate={new Date()}
              />
            </div>
            <div className="checkout col-lg-6">
              <label htmlFor="">Trả Phòng</label>
              <DatePicker
                autoFocus={false}
                format="yyyy-MM-dd"
                locale="vi-VI"
                calendarIcon={false}
                clearIcon={false}
                onChange={setCheckOutValue}
                value={checkOutValue}
                minDate={checkInValue}
              />
            </div>
          </div>
          <div className="people">
            <label htmlFor="">Khách</label>
            <input
              type="number"
              defaultValue={1}
              {...register("soLuongKhach")}
            />
          </div>
          <div className="paid">
            <button className="btn-paid" onClick={handleSubmit(onSubmit)}>
              Đặt Phòng
            </button>
            <p className="note">Bạn vẫn chưa bị trừ tiền</p>
          </div>
          <hr />
          <div className="price-days">
            <p className="price">
              {room.giaTien}$ x
              {dayjsCheckOutValue.diff(dayjsCheckInValue, "day") + 1} đêm
            </p>
            <p className="total-pricedays">
              {room.giaTien *
                (dayjsCheckOutValue.diff(dayjsCheckInValue, "day") + 1)}
              $
            </p>
          </div>
          <div className="fee">
            <p className="label">Phí dịch vụ</p>
            <p className="fee-price">30 $</p>
          </div>
          <hr />
          <div className="total">
            <p>Tổng</p>
            <p>
              {room.giaTien *
                (dayjsCheckOutValue.diff(dayjsCheckInValue, "day") + 1) +
                30}
              $
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Total;

import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import DatePicker from "react-date-picker";
import moment from "moment";
import "./total.scss";
import { useForm } from "react-hook-form";
import roomsAPI from "../../../services/roomsAPI";
import { format } from "date-fns";
const Total = ({ room, user }) => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());
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
      // setCheckInValue(moment().format("DD/MM/yyyy"));
      // setCheckOutValue(moment().format("DD/MM/yyyy"));
      const newValues = {
        maPhong: room.id,
        ngayDen: checkInValue,
        ngayDi: checkOutValue,
        soLuongKhach: values.soLuongKhach,
        maNguoiDung: user.user.id,
      };
      console.log(newValues);
      await roomsAPI.postPaidRoom(newValues);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="booking">
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
          <div className="check-in-out">
            <div className="checkin">
              <label htmlFor="">Nhận Phòng</label>
              <DatePicker
                autoFocus={false}
                format="dd-MM-yyyy"
                locale="vi-VI"
                calendarIcon={false}
                clearIcon={false}
                onChange={setCheckInValue}
                value={checkInValue}
                minDate={new Date()}
              />
            </div>
            <div className="checkout">
              <label htmlFor="">Trả Phòng</label>
              <DatePicker
                autoFocus={false}
                format="dd-MM-yyyy"
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
            <p className="price">{room.giaTien}$ x đêm</p>
            <p className="total-pricedays">$</p>
          </div>
          <div className="fee">
            <p className="label">Phí dịch vụ</p>
            <p className="fee-price">30 $</p>
          </div>
          <hr />
          <div className="total">
            <p>Tổng</p>
            <p>$</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Total;
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

import DatePicker from "react-date-picker";
import moment from "moment";
import "./total.scss";
const Total = ({ room }) => {
  const [checkInValue, setCheckInValue] = useState(new Date());
  const [checkOutValue, setCheckOutValue] = useState(new Date());

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
          <div className="check-inOut">
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
            <div className="people">
              <label htmlFor="">Khách</label>
              <input type="number" />
            </div>
            <div className="paid">
              <button className="btn-paid">Đặt Phòng</button>
              <p className="note">Bạn vẫn chưa bị trừ tiền</p>
            </div>
            <hr />
            <div className="price-days">
              <p className="price">
                {room.giaTien}$ x{" "}
                {(checkOutValue.getTime() - checkInValue.getTime()) /
                  (1000 * 3600 * 24)}{" "}
                đêm
              </p>
              <p className="total-pricedays">
                {(room.giaTien *
                  (checkOutValue.getTime() - checkInValue.getTime())) /
                  (1000 * 3600 * 24)}{" "}
                $
              </p>
            </div>
            <div className="fee">
              <p className="label">Phí dịch vụ</p>
              <p className="fee-price">30 $</p>
            </div>
            <div className="total">
              <p>Tổng</p>
              <p>
                {(room.giaTien *
                  (checkOutValue.getTime() - checkInValue.getTime())) /
                  (1000 * 3600 * 24) +
                  30}{" "}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Total;

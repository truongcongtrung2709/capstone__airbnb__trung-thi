import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import roomsAPI from "../../services/roomsAPI";
import "./rentlist.scss";
const RentList = () => {
  const [locationDetails, setLocationDetails] = useState([]);
  const location = useLocation();
  const stateLocation = location.state.selectedItem;
  useEffect(() => {
    (async () => {
      try {
        const data = await roomsAPI.getRoomByLocation(stateLocation.id);
        setLocationDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="rent-list">
      <div className="rent-list__container">
        <div className="rent-list__container__content">
          <p className="description">
            Hơn 300 chỗ ở - Hãy chọn chỗ ở phù hợp nhất
          </p>
          <h1 className="title">Chỗ ở tại vị trí đã chọn</h1>
          <div className="room-list">
            {locationDetails.map((room) => (
              <div className="room" key={room.id}>
                <div className="room__img">
                  <img src={room.hinhAnh} alt={room.id} />
                </div>
                <div className="room__info">
                  <p>Toàn bộ căn hộ dịch vụ tại {stateLocation.tinhThanh}</p>
                  <h2>{room.tenPhong}</h2>
                  <p className="details">
                    {room.khach} khách - {room.phongNgu} phòng ngủ -
                    {room.giuong} giường - {room.phongTam} phòng tắm
                  </p>
                  <span className="price">{room.giaTien}$ / Ngày</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentList;

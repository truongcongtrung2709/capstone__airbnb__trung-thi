import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import roomsAPI from "../../services/roomsAPI";
import "./rentlist.scss";
const RentList = () => {
  let { maViTri } = useParams();
  const [locationDetails, setLocationDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const data = await roomsAPI.getRoomByLocation(maViTri);
        setLocationDetails(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleClickRoom = (room) => {
    navigate(`/rentdetail/${room.id}`, {
      state: {
        room: room,
        locationDetails: locationDetails,
      },
    });
  };
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
              <div
                className="room"
                key={room.id}
                onClick={() => {
                  handleClickRoom(room);
                }}
              >
                <div className="room__img">
                  <img src={room.hinhAnh} alt={room.id} />
                </div>
                <div className="room__info">
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

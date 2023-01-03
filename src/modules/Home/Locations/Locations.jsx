import React, { useEffect, useState } from "react";
import "./locations.scss";
import Card from "react-bootstrap/Card";
import locationsAPI from "../../../services/locationsAPI";

import house from "./images/house.jpg";
import sea from "./images/sea.jpg";
import farm from "./images/houseFarm.jpg";
import pet from "./images/pet.jpg";
import { Link, useNavigate } from "react-router-dom";
const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const data = await locationsAPI.getLocations();
      setLocations(data);
    })();
  }, []);
  const selectItem = (item) => {
    console.log(item.id);
    setSelectedItem(item);
    setSelectedItemId(item.id);
  };
  return (
    <div className="locations">
      <div className="locations__container">
        <div className="locations__content">
          <div className="title">
            <h3>Khám phá những địa điểm đến gần đây</h3>
          </div>
          <div className="locations__list">
            <div className="location row">
              {locations.map((location) => (
                <Link
                  to={`/rentlist/${selectedItemId}`}
                  state={{
                    selectedItem: selectedItem,
                    selectedItemId: selectedItemId,
                  }}
                  onClick={() => selectItem(location)}
                  key={location.id}
                  className="card col-3"
                >
                  <Card.Body>
                    <div className="card__img">
                      <Card.Img variant="left" src={location.hinhAnh} />
                    </div>
                    <div className="info">
                      <Card.Title>{location.tenViTri}</Card.Title>
                      <Card.Text>{location.tinhThanh}</Card.Text>
                    </div>
                  </Card.Body>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="everywhere">
          <div className="everywhere__title">
            <h3>Ờ bất cứ đâu</h3>
          </div>
          <div className="everywhere__list row">
            <div className="everywhere__item col-3">
              <img src={house} alt="" />
              <h5>Toàn bộ nhà</h5>
            </div>
            <div className="everywhere__item col-3">
              <img src={sea} alt="" />
              <h5>Chổ ở độc đáo</h5>
            </div>
            <div className="everywhere__item col-3">
              <img src={farm} alt="" />
              <h5>Trang trại và thiên nhiên</h5>
            </div>
            <div className="everywhere__item col-3">
              <img src={pet} alt="" />
              <h5>Cho phép mang theo thú cưng</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;

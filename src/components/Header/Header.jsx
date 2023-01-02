import React, { useEffect, useRef, useState } from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./header.scss";
import logo from "./airbnb.svg";
import { Link, useNavigate } from "react-router-dom";

import { AiOutlineGlobal } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import { GrFormSearch } from "react-icons/gr";
import { MdLocationOn } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slides/authSlide";
import locationsAPI from "../../services/locationsAPI";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // show search bar
  const [isActive, setIsActive] = useState(false);
  const [showBar, setShowBar] = useState(false);
  //dropdown search
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    (async () => {
      const data = await locationsAPI.getLocations();
      setLocations(data);
    })();
  }, []);
  const handleIsActive = () => {
    setIsActive((current) => !current);
    setShowBar((current) => !current);
  };

  const handleChangeLocations = (e) => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickInput, false);
    return () =>
      document.removeEventListener("mousedown", handleClickInput, false);
  }, []);
  const handleClickInput = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };
  const searchFilter = (searchValue, locations, searchBy = "tenViTri") => {
    let lowerCaseQuery = searchValue.toLowerCase();
    let filteredLocations = searchValue
      ? locations.filter((x) =>
          x[searchBy].toLowerCase().includes(lowerCaseQuery)
        )
      : locations;
    return filteredLocations;
  };
  const selectItem = (item) => {
    setSearchValue(`${item.tenViTri}, ${item.tinhThanh}, ${item.quocGia}`);
    setSelectedItemId(item.id);
    setSelectedItem(item);
    setVisible(false);
  };

  // const handleSearch = () => {};
  const Logged = () => {
    return (
      <Dropdown.Menu>
        <Dropdown.Item href="/accountdetail">{user.user.name}</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Đăng Xuất</Dropdown.Item>
        <hr />
        <Dropdown.Item href="/signup">Đăng Ký</Dropdown.Item>
      </Dropdown.Menu>
    );
  };

  const Nonlogged = () => {
    return (
      <Dropdown.Menu>
        <Dropdown.Item href="/signin">Đăng Nhập</Dropdown.Item>
        <Dropdown.Item href="/signup">Đăng Ký</Dropdown.Item>
      </Dropdown.Menu>
    );
  };
  const handleLogout = () => {
    dispatch(logout());
    alert("Bạn đã đăng xuất");
    navigate("/");
  };
  return (
    <>
      <Navbar fixed="top">
        <div className="header__container">
          <div className="col-4 ">
            <Navbar.Brand href="/">
              <img
                className="img-logo"
                src={logo}
                alt=""
                width={102}
                height={32}
              />
            </Navbar.Brand>
          </div>
          <Nav className="me-auto options col-4 ">
            <div className="options__title">
              <div
                className="options__detail"
                style={{ display: isActive ? "none" : "" }}
                onClick={handleIsActive}
              >
                <Nav.Link href="#">Địa điểm bất kỳ</Nav.Link>
                <span className="border"></span>
                <Nav.Link href="#">Tuần bất kỳ</Nav.Link>
                <span className="border"></span>
                <Nav.Link href="#">
                  Thêm khách
                  <div className="search__btn">
                    <GrFormSearch />
                  </div>
                </Nav.Link>
              </div>
            </div>
            {/* Hiding Search */}
            <div
              className="hiding-search"
              style={{ display: showBar ? "block" : "" }}
            >
              <div className="options_show">
                <Nav.Link href="#">Chỗ ở</Nav.Link>
                <Nav.Link href="#">Trải nghiệm</Nav.Link>
                <Nav.Link href="#">Trải nghiệm trực tuyến</Nav.Link>
              </div>
              <div className="search">
                <form className="search__content">
                  <div className="search__content__item search__content__item__locations col-4">
                    <label>Địa điểm</label>
                    <input
                      type="text"
                      placeholder="Tìm kiếm tỉnh thành"
                      onChange={handleChangeLocations}
                      onClick={handleClickInput}
                      value={searchValue}
                      onFocus={() => {
                        // if (searchValue) {
                        setVisible(true);
                        // };
                      }}
                    />
                    {/* locations value dropdown */}
                    <div
                      ref={dropdownRef}
                      className={`dropdown ${visible ? "v" : ""} `}
                    >
                      {visible && (
                        <ul>
                          {!locations && (
                            <li key="none" className="dropdown__item">
                              no result
                            </li>
                          )}
                          {locations &&
                            searchFilter(searchValue, locations).map((item) => (
                              <li
                                key={item.id}
                                className="dropdown__item"
                                onClick={() => selectItem(item)}
                              >
                                <MdLocationOn />
                                <p>
                                  {item.tenViTri}, {item.tinhThanh},
                                  {item.quocGia}
                                </p>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className=" search__content__item col-3">
                    <label>Nhận phòng</label>
                    <input type="text" placeholder="Thêm ngày" />
                  </div>
                  <div className=" search__content__item col-2">
                    <label htmlFor="">Trả phòng</label>
                    <input type="text" placeholder="Thêm ngày" />
                  </div>
                  <div className="last-item search__content__item col-2">
                    <label htmlFor="">Khách</label>
                    <input type="text" placeholder="Thêm khách" />
                  </div>
                  <Link
                    to={`/rentlist/${selectedItemId}`}
                    state={{ selectedItem: selectedItem }}
                    className="btn-roomSearch col-1"
                    // onClick={handleSearch}
                  >
                    <span className="search-icon">
                      <AiOutlineSearch />
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </Nav>
          <Nav className="me-auto end-nav col-4">
            <Nav.Link href="#">Cho thuê chỗ ở qua Airbnb</Nav.Link>
            <Nav.Link href="#">
              <AiOutlineGlobal />
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle>
                <HiMenu className="toggle" />
                <RiAccountCircleFill className="person" />
              </Dropdown.Toggle>
              {user ? <Logged /> : <Nonlogged />}
            </Dropdown>
          </Nav>
        </div>
      </Navbar>
    </>
  );
};

export default Header;

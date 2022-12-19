import React from "react";
import { Container, Dropdown, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./header.scss";
import logo from "./airbnb.svg";

import { AiOutlineGlobal } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { RiAccountCircleFill } from "react-icons/ri";
import { GrFormSearch } from "react-icons/gr";
const Header = () => {
  return (
    <>
      <Navbar fixed="top">
        <div className="header__container">
          <Navbar.Brand href="/" className="col-4">
            <img src={logo} alt="" width={102} height={32} />
          </Navbar.Brand>
          <Navbar.Collapse id="responsive-navbar-nav" className="col-8">
            <Nav className="me-auto options col-5">
              <div className="options__title">
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
            </Nav>
            <Nav className="me-auto end-nav col-7">
              <Nav.Link href="#">Cho thuê chỗ ở qua Airbnb</Nav.Link>
              <Nav.Link href="#">
                <AiOutlineGlobal />
              </Nav.Link>
              <Dropdown>
                <Dropdown.Toggle>
                  <HiMenu className="toggle" />
                  <RiAccountCircleFill className="person" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="/signin">Đăng Nhập</Dropdown.Item>
                  <Dropdown.Item href="/signup">Đăng Ký</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  );
};

export default Header;

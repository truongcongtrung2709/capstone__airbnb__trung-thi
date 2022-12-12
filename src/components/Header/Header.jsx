import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./header.scss";
const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Navbar variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src=""
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              airbnb
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};

export default Header;

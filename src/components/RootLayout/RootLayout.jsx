import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const RootLayout = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;

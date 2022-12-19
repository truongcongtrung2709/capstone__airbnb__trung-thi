import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout/RootLayout";
import Home from "../modules/Home/Home";
import Auth from "../modules/Auth/Auth";
import Signin from "../modules/Auth/Signin/Signin";
import Signup from "../modules/Auth/Signup/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "",
        element: <Auth />,
        children: [
          { path: "/signin", element: <Signin />, title: "Đăng Nhập" },
          { path: "/signup", element: <Signup />, title: "Đăng Ký" },
        ],
      },
    ],
  },
]);

export default routes;

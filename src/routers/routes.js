import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout/RootLayout";
import Home from "../modules/Home/Home";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }, {}],
  },
]);

export default routes;

import { RouterProvider } from "react-router-dom";
import routes from "./routers/routes";
import "./app.scss";
function App() {
  return <RouterProvider router={routes} />;
}

export default App;

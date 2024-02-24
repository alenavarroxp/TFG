import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { World } from "../pages/World";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/babylon", element: <World/> },
]);

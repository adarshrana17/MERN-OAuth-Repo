import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import LoginRedirect from "./Component/LoginRedirect.jsx";
import SearchPage from "./Component/SearchPage.jsx";
import Login from "./Component/Login.jsx";
import Home from "./Component/Home.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/auth/callback",
    element: <LoginRedirect />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./main/main-page.tsx";
import { RegistrationPage } from "./registration/registration-page.tsx";
import CCTVPage from "./cctv/cctv-page.tsx";
import AccessLogsPage from "./access-logs/access-logs-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/user-registration",
    element: <RegistrationPage />,
  },
  {
    path: "/cctv",
    element: <CCTVPage />,
  },
  {
    path: "/access-logs",
    element: <AccessLogsPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

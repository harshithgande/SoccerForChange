import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import About from "./About.jsx";
import Register from "./Register.jsx";
import Apply from "./Apply.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import PayPlace from "./PayPlace.jsx";
import Home from "./Home.jsx"; // ✅ FIXED: Import Home component

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> }, // ✅ Home Page
      { path: "/about", element: <About /> },
      { path: "/register", element: <Register /> },
      { path: "/apply", element: <Apply /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/pay", element: <PayPlace /> }, // ✅ Payment Page
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} /> // ✅ FIXED: Removed extra <App />
);

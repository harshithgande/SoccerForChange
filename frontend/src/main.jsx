import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import About from "./About.jsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Home.jsx";
import Register from "./Register.jsx";
import Apply from "./Apply.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import { PaymentSuccess } from "./Pay.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/apply",
        element: <Apply />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

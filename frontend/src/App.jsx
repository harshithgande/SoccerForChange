import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Register from "./Register";
import PrivacyPolicy from "./PrivacyPolicy";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

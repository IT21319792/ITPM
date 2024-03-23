import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from 'js-cookie';

const TopNav = () => {
  const [open, toggleOpen] = useState(false);
  const navigate = useNavigate();
  const handleMenuExpand = () => {
    toggleOpen((prev) => !prev);
  };
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      console.warn(`Section with ID '${sectionId}' not found.`);
    }
  }

  //handle the logout function with deleting all cookies
  const handleLogout = () => {
    Cookies.remove("userRole", { path: "/" });
    Cookies.remove("token", { path: "/" });
    Cookies.remove("pvt", { path: "/" });
    navigate("/login");
  };

  return (
    <>
      <div className="items-center lg:px-10 bg-gray-400 flex ">
        <Link
          to={"#"}
          className="text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white"
        >
          Home
        </Link>
        <Link
          to={"#"}
          className="text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white"
          onClick={() => scrollToSection("vision")}
        >
          Vision
        </Link>
        <Link
          to={"#"}
          className="text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white"
          onClick={() => scrollToSection("mission")}
        >
          Mission
        </Link>
        <Link
          to={"#"}
          className="text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white"
          onClick={() => scrollToSection("support")}
        >
          Support
        </Link>
        <Link
          to={"#"}
          className="text-white bg-gray-400 text-lg hover:bg-gray-500 p-5 focus:bg-blue-950 focus:text-white"
          onClick={() => scrollToSection("notices")}
        >
          Notices
        </Link>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={handleLogout}
          style={{ position: "absolute", top: 18, right: 15 }}
        >
          Log out
        </Button>
      </div>
    </>
  );
};

export default TopNav;

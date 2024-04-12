import React from "react";
import logo from "../assets/images/logo1.png";

const Logo = ({ width = "100px" }) => {
  return (
    <figure>
      <img src={logo} alt="logoImage" width={width} />
    </figure>
  );
};

export default Logo;

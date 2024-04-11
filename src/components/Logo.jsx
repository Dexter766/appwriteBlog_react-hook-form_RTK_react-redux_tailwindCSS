import React from "react";
import logo from "../assets/images/6b3c5afbbabd006848b5be4e7dcf57fb7c595b0e_2_500x500-removebg-preview.png";

const Logo = ({ width = "100px" }) => {
  return (
    <figure>
      <img src={logo} alt="logoImage" width={width} />
    </figure>
  );
};

export default Logo;

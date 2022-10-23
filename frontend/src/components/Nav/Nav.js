import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      textDecoration: isActive ? "none" : "underline"
    };
  };
  return (
    <nav className="primary-nav">
      <NavLink style={navLinkStyles} to="/">
        Log
      </NavLink>
      <NavLink style={navLinkStyles} to="/Dashboard">
        Dashboard
      </NavLink>
    </nav>
  );
};
export default Nav;


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
        Dashboard
      </NavLink>
      <NavLink style={navLinkStyles} to="/transfer">
        Transfer Stock
      </NavLink>
      <NavLink style={navLinkStyles} to="/logs">
        Logs
      </NavLink> 
    </nav>
  );
};
export default Nav;


import React from "react";
import { NavLink } from "react-router-dom";
import { headerLink, headerLinkSelected } from "./HeaderLink.module.css";

export default function HeaderLink({ children, title, to }) {
  return (
    <NavLink
      exact
      to={to}
      className={headerLink}
      activeClassName={headerLinkSelected}
      title={title}
    >
      {children}
    </NavLink>
  );
}

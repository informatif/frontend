import React from "react";
import { NavLink } from "react-router-dom";
import { appNavLink, appNavLinkSelected } from "./AppNavLink.module.css";

export default function AppNavLink({ children, title, to }) {
  return (
    <NavLink
      exact
      to={to}
      className={appNavLink}
      activeClassName={appNavLinkSelected}
      title={title}
    >
      {children}
    </NavLink>
  );
}

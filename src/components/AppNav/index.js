import React from "react";
import { FaStackOverflow, FaHackerNews, FaNewspaper } from "react-icons/fa";
import AppNavLink from "../AppNavLink";
import { appNav } from "./AppNav.module.css";

export default function AppNav() {
  return (
    <nav className={appNav}>
      <AppNavLink to="/hn" title="Hacker News">
        <FaHackerNews />
      </AppNavLink>
      <AppNavLink to="/so" title="Stack Overflow">
        <FaStackOverflow />
      </AppNavLink>
      <AppNavLink to="/global" title="Global News">
        <FaNewspaper />
      </AppNavLink>
    </nav>
  );
}

import React from "react";
import {
  FaStackOverflow,
  FaHackerNews,
  FaNewspaper,
  FaReddit,
  FaGithub
} from "react-icons/fa";
import AppNavLink from "../AppNavLink";
import { footer } from "./Footer.module.css";
import DarkModeToggle from "../DarkModeToggle";

export default function Footer() {
  return (
    <footer className={footer}>
      <DarkModeToggle />
      <div>
        <AppNavLink to="/hn" title="Hacker News">
          <FaHackerNews />
        </AppNavLink>
        <AppNavLink to="/gh" title="GitHub">
          <FaGithub />
        </AppNavLink>
        <AppNavLink to="/so" title="Stack Overflow">
          <FaStackOverflow />
        </AppNavLink>
        <AppNavLink to="/reddit" title="Reddit">
          <FaReddit />
        </AppNavLink>
        <AppNavLink to="/global" title="Global News">
          <FaNewspaper />
        </AppNavLink>
      </div>
    </footer>
  );
}

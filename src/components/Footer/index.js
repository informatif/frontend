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
import Padding from "../Padding";

export default function Footer() {
  return (
    <footer className={footer}>
      <Padding
        padding={{
          left: "8px"
        }}
      >
        <DarkModeToggle />
      </Padding>
      <Padding
        padding={{
          right: "8px"
        }}
      >
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
      </Padding>
    </footer>
  );
}

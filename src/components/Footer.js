import React from "react";
import styled from "styled-components/macro";
import {
  FaStackOverflow,
  FaHackerNews,
  FaNewspaper,
  FaReddit,
  FaGithub
} from "react-icons/fa";
import AppNavLink from "./AppNavLink";
import DarkModeToggle from "./DarkModeToggle";

const StyledFooter = styled.footer`
  align-items: center;
  background: var(--background-color);
  bottom: 0;
  box-shadow: 0 -1px 4px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  list-style-type: none;
  margin: 0;
  min-height: 40px;
  position: fixed;
  justify-content: space-between;
  width: 100%;
`;

export default function Footer({ className }) {
  return (
    <StyledFooter>
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
    </StyledFooter>
  );
}

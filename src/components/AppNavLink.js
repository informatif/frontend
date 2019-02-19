import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

const activeClassName = "AppNavLink--selected";

const StyledNavLink = styled(NavLink)`
  color: var(--text-color);
  font-size: 1.5rem;
  padding: 0 8px;
  text-decoration: none;
  transition: color 160ms ease-out;

  :hover {
    color: var(--primary-color);
  }

  &.${activeClassName} {
    color: var(--primary-color);
  }
`;

export default function AppNavLink({ children, title, to }) {
  return (
    <StyledNavLink
      exact
      to={to}
      activeClassName={activeClassName}
      title={title}
    >
      {children}
    </StyledNavLink>
  );
}

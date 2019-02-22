import React from "react";
import styled from "styled-components/macro";
import useDarkMode from "use-dark-mode";

const StyledDarkModeToggle = styled.label`
  padding: 0 8px;
`;

const Icon = styled.span`
  font-size: 1.5rem;

  :hover {
    cursor: pointer;
  }
`;

const Checkbox = styled.input`
  height: 0;
  margin: 0;
  visibility: hidden;
  width: 0;
`;

export default function DarkModeToggle() {
  const { value, toggle } = useDarkMode(false);

  return (
    <StyledDarkModeToggle title="Day/night mode">
      <Checkbox type="checkbox" onChange={toggle} />
      <Icon>{value ? "🌚" : "🌞"}</Icon>
    </StyledDarkModeToggle>
  );
}

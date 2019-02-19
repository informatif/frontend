import styled from "styled-components/macro";

export default styled.button`
  align-items: center;
  background-color: var(--background-color);
  border: 1px solid var(--text-color);
  border-radius: 4px;
  color: var(--text-color);
  display: inline-flex;
  padding: 4px;
  transition: background-color 80ms ease-out;

  :hover {
    background-color: var(--text-color);
    color: var(--background-color);
    cursor: pointer;
  }
`;

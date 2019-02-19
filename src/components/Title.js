import styled from "styled-components/macro";

export default styled.span`
  font-family: Bitter, sans-serif;
  color: ${({ colored }) => colored && "var(--primary-color)"};
`;

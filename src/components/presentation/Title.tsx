import styled from "styled-components/macro";

export default styled.span`
  font-family: Bitter, sans-serif;
  color: ${({ colored }: { colored?: boolean }) =>
    colored && "var(--primary-color)"};
`;

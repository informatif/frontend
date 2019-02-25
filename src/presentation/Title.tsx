import styled from "styled-components/macro";

type Props = { colored?: boolean; size?: string };

export default styled.h1`
  color: ${({ colored }: Props) => colored && "var(--primary-color)"};
  display: inline-block;
  font-family: Bitter, sans-serif;
  font-size: ${({ size }: Props) => size};
`;

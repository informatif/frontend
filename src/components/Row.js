import styled from "styled-components/macro";

export default styled.div`
  display: flex;
  align-items: ${({ crossAxisAlignment }) => crossAxisAlignment};
`;

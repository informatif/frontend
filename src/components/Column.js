import styled from "styled-components/macro";

export default styled.div`
  align-items: ${({ crossAxisAlignment }) => crossAxisAlignment};
  display: flex;
  flex-direction: column;
`;

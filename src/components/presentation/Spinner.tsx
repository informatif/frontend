import styled, { keyframes } from "styled-components/macro";
import { FaSpinner } from "react-icons/fa";

const spin = keyframes`
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
`;

export default styled(FaSpinner)`
  animation: ${spin} infinite 2s linear;
`;

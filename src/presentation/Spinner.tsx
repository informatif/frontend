import { FaSpinner } from "react-icons/fa";
import styled, { keyframes } from "styled-components/macro";

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

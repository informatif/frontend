/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";
import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <FaSpinner
      css={css`
        animation: spin infinite 2s linear;
        @keyframes spin {
          from {
            transform: rotate(0turn);
          }

          to {
            transform: rotate(1turn);
          }
        }
      `}
    />
  );
}

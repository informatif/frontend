/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

export default function Title({ children, colored }) {
  return (
    <span
      css={css`
        font-family: Bitter, sans-serif;
        padding: 0 8px;
        color: ${colored ? "var(--primary-color)" : "unset"};
      `}
    >
      {children}
    </span>
  );
}

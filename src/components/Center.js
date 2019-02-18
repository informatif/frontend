/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

export default function Center({ children }) {
  return (
    <div
      css={css`
        align-items: center;
        display: flex;
        justify-content: center;
      `}
    >
      {children}
    </div>
  );
}

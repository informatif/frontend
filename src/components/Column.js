/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

export default function Column({ children, crossAxisAlignment }) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: ${crossAxisAlignment === "center" ? "center" : "unset"};
      `}
    >
      {children}
    </div>
  );
}

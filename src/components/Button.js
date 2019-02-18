/** @jsx jsx */
import { jsx } from "@emotion/core";
import css from "@emotion/css/macro";

export default function Button(props) {
  return (
    <button
      css={css`
        background: none;
        color: var(--text-color);
        display: inline-flex;
        align-items: center;
      `}
      {...props}
    />
  );
}

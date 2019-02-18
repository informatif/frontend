import React from "react";

export default function Padding({ children, padding = {} }) {
  const { left, right } = padding;
  const style = {
    paddingRight: right,
    paddingLeft: left
  };
  return <span style={style}>{children}</span>;
}

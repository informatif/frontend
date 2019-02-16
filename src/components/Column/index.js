import React from "react";
import { column, columnCrossAxisAlignmentCenter } from "./Column.module.css";

export default function Column({ children, crossAxisAlignment }) {
  let className = column;
  if (crossAxisAlignment === "center") {
    className += ` ${columnCrossAxisAlignmentCenter}`;
  }
  return <div className={className}>{children}</div>;
}

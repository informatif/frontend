import React from "react";
import { row, rowCrossAxisAlignmentCenter } from "./Row.module.css";

export default function Row({ children, crossAxisAlignment }) {
  let className = row;
  if (crossAxisAlignment === "center") {
    className += rowCrossAxisAlignmentCenter;
  }
  return <div className={className}>{children}</div>;
}

import React from "react";
import { title, titleColored } from "./Title.module.css";

export default function Title({ children, colored }) {
  let className = title;
  if (colored) {
    className += ` ${titleColored}`;
  }
  return <span className={className}>{children}</span>;
}

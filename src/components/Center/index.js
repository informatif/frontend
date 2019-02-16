import React from "react";
import { center, centerVertical } from "./Center.module.css";

export default function Center({ vertical, children }) {
  let className = center;
  if (vertical) {
    className += ` ${centerVertical}`;
  }
  return <div className={className}>{children}</div>;
}

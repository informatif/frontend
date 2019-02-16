import React from "react";
import { row } from "./Row.module.css";

export default function Row({ children }) {
  return <div className={row}>{children}</div>;
}

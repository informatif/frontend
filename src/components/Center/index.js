import React from "react";
import { center } from "./Center.module.css";

export default function Center({ children }) {
  return <div className={center}>{children}</div>;
}

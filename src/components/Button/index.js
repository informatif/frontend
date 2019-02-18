import React from "react";
import { button } from "./Button.module.css";

export default function Button(props) {
  return <button className={button} {...props} />;
}

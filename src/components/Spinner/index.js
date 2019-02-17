import React from "react";
import { FaSpinner } from "react-icons/fa";
import { spinner } from "./Spinner.module.css";

export default function Spinner() {
  return <FaSpinner className={spinner} />;
}

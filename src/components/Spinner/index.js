import React from "react";
import { FaSpinner } from "react-icons/fa";
import Center from "../Center";
import { spinner } from "./Spinner.module.css";

export default function Spinner() {
  return (
    <Center>
      <FaSpinner className={spinner} />
    </Center>
  );
}

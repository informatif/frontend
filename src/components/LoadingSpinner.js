import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div className="center">
      <FaSpinner className="spinner" size="1.5rem" /> <h2>Loading...</h2>
    </div>
  );
}

import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "./hooks/document";
import Column from "./presentation/Column";

export default function NoMatch() {
  useDocumentTitle("Not Found");

  return (
    <Column crossAxisAlignment="center">
      <FaRegSadTear size="3rem" />
      <h2>Sorry, we couldn't find what you were looking for.</h2>
      <p>
        Perhaps you would like to check out one of our other{" "}
        <Link to="/hn">sources</Link>?
      </p>
    </Column>
  );
}

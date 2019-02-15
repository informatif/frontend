import React from "react";
import { Link } from "react-router-dom";
import { FaRegSadTear } from "react-icons/fa";

export default function NoMatch() {
  return (
    <div class="center center--vertical">
      <FaRegSadTear size="3rem" />
      <h2>Sorry, we couldn't find what you were looking for.</h2>
      <p>
        Perhaps you would like to check out one of our other{" "}
        <Link to="/hn">sources</Link>?
      </p>
    </div>
  );
}

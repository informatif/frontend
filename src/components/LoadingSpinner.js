import React from "react";
import Spinner from "./Spinner";
import Center from "./Center";

export default function LoadingSpinner() {
  return (
    <Center>
      <Spinner /> <h2>Loading...</h2>
    </Center>
  );
}

import React from "react";
import { FaRegSadTear } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "./hooks/document";
import Container from "./presentation/Container";
import Row from "./presentation/Row";
import Center from "./presentation/Center";

export default function NoMatch() {
  useDocumentTitle("Not Found");

  return (
    <Center>
      <Container padding={{ top: "8px", left: "8px", right: "8px" }}>
        <Row>
          <FaRegSadTear size="3rem" />
          <Container padding={{ left: "8px" }}>
            Sorry, we couldn't find what you were looking for.
            <br />
            Perhaps you would like to check out one of our other{" "}
            <Link to="/hn">sources</Link>?
          </Container>
        </Row>
      </Container>
    </Center>
  );
}

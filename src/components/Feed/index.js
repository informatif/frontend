import React from "react";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import {
  list,
  listItem,
  itemContent,
  itemSubtitle,
  itemLink
} from "./Feed.module.css";
import Center from "../Center";
import Title from "../Title";
import Row from "../Row";
import Spinner from "../Spinner";
import Button from "../Button";
import { STATUSES } from "../../hooks/api";
import { useDocumentTitle } from "../../hooks/document";

export default function Feed({ status, items, title, onRefresh, onLoadMore }) {
  useDocumentTitle(title);

  return (
    <>
      <Row crossAxisAlignment="center">
        <Title>{title}</Title>
        {status === STATUSES.refreshing ? (
          <Spinner />
        ) : (
          <Button onClick={onRefresh} title="Refresh">
            <FaSyncAlt />
          </Button>
        )}
      </Row>
      <ul className={list}>
        {items.map(
          ({ link, title, points, responseCount, id, author, description }) => (
            <li className={listItem} key={id}>
              <div className={itemContent}>
                <a href={link} className={itemLink} title="Title">
                  {title} {description && `— ${description}`}
                </a>
                <div>
                  <span title="Author" className={itemSubtitle}>
                    {author}
                  </span>
                  {points != null && (
                    <>
                      <span> • </span>
                      <span className={itemSubtitle} title="Points">
                        {points} <FaRegArrowAltCircleUp />
                      </span>
                    </>
                  )}
                  {responseCount != null && (
                    <>
                      <span> • </span>
                      <span className={itemSubtitle} title="Responses">
                        {responseCount} <FaRegCommentAlt />
                      </span>
                    </>
                  )}
                </div>
              </div>
            </li>
          )
        )}
      </ul>
      <Center>
        {status === STATUSES.loadingMore && <Spinner />}
        {onLoadMore && status === STATUSES.idle && (
          <Button onClick={onLoadMore}>Load more</Button>
        )}
      </Center>
    </>
  );
}

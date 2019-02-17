import React from "react";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import ErrorBoundary from "../ErrorBoundary";
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
import { API_ACTIONS } from "../../hooks/api";
import { useDocumentTitle } from "../../hooks/document";

export default function Feed({ action, items, title, onRefresh, onLoadMore }) {
  useDocumentTitle(title);

  return (
    <>
      <Row crossAxisAlignment="center">
        <Title>{title}</Title>
        {action === API_ACTIONS.refreshing ? (
          <Spinner />
        ) : (
          <button
            onClick={onRefresh}
            className="header__action"
            title="Refresh"
          >
            <FaSyncAlt />
          </button>
        )}
      </Row>
      <ErrorBoundary>
        <ul className={list}>
          {items.map(
            ({
              link,
              title,
              points,
              responseCount,
              id,
              author,
              description
            }) => (
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
          {action === API_ACTIONS.loading && <Spinner />}
          {onLoadMore && action === API_ACTIONS.idle && (
            <button onClick={onLoadMore}>Load more</button>
          )}
        </Center>
      </ErrorBoundary>
    </>
  );
}

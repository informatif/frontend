import React from "react";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import ErrorBoundary from "../../ErrorBoundary";
import {
  list,
  listItem,
  itemContent,
  itemSubtitle,
  itemLink
} from "./List.module.css";
import Center from "../../Center";
import Title from "../../Title";

export default function List({ items, title, handleRefresh, handleLoadMore }) {
  return (
    <>
      <Center>
        <Title>
          <h2>{title}</h2>
        </Title>
        <button
          onClick={handleRefresh}
          className="header__action"
          title="Refresh"
        >
          <FaSyncAlt />
        </button>
      </Center>
      <ErrorBoundary>
        <ul className={list}>
          {items.map(({ link, title, points, responseCount, id, author }) => (
            <li className={listItem} key={id}>
              <div className={itemContent}>
                <a href={link} className={itemLink} title="Title">
                  {title}
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
          ))}
        </ul>
        <Center>
          <button onClick={handleLoadMore}>Load more</button>
        </Center>
      </ErrorBoundary>
    </>
  );
}

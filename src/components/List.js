import React from "react";
import { FaRegComment, FaSyncAlt } from "react-icons/fa";
import ErrorBoundary from "./ErrorBoundary";
import {
  list,
  list__item,
  item__points,
  item__content,
  item__author,
  item__link
} from "./List.module.css";
import Center from "./Center";
import Title from "./Title";

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
            <li className={list__item} key={id}>
              {points !== undefined && (
                <span className={item__points} title="Points">
                  {points > 0 ? `+${points}` : points}
                </span>
              )}
              <div className={item__content}>
                <a href={link} className={item__link} title="Title">
                  {title}
                </a>
                <span className={item__author} title="Author">
                  {author}
                </span>
              </div>
              {responseCount !== undefined && (
                <span title="Responses">
                  {responseCount} <FaRegComment />
                </span>
              )}
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

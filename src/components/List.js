import React from "react";
import { FaRegComment, FaSyncAlt } from "react-icons/fa";
import ErrorBoundary from "./ErrorBoundary";
import "./List.css";

export default function List({ items, title, handleRefresh, handleLoadMore }) {
  return (
    <>
      <header className="header center">
        <h2 className="title">{title}</h2>
        <button
          onClick={handleRefresh}
          className="header__action"
          title="Refresh"
        >
          <FaSyncAlt />
        </button>
      </header>
      <ErrorBoundary>
        <ul className="list">
          {items.map(({ link, title, points, responseCount, id, author }) => (
            <li className="list__item" key={id}>
              {points !== undefined && (
                <span className="item__points" title="Points">
                  {points > 0 ? `+${points}` : points}
                </span>
              )}
              <div className="item__content">
                <a href={link} className="item__link" title="Title">
                  {title}
                </a>
                <span className="item__author" title="Author">
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
        <div className="center">
          <button onClick={handleLoadMore}>Load more</button>
        </div>
      </ErrorBoundary>
    </>
  );
}

import React from "react";
import { FaRegComment, FaSyncAlt } from "react-icons/fa";
import "./List.css";

export default function List({ items, title, handleRefresh }) {
  return (
    <>
      <header className="header">
        <h2 className="title">{title}</h2>
        <button
          onClick={handleRefresh}
          className="header__action"
          title="Refresh"
        >
          <FaSyncAlt />
        </button>
      </header>
      <ul className="list">
        {items.map(
          ({
            link,
            title,
            points,
            responseCount,
            id,
            author,
            responseLink = null
          }) => (
            <li className="list__item" key={id}>
              <span className="item__points" title="Points">
                {points > 0 ? `+${points}` : points}
              </span>
              <div className="item__content">
                <a href={link} className="item__link" title="Title">
                  {title}
                </a>
                <span className="item__author" title="Author">
                  {author}
                </span>
              </div>
              <a href={responseLink} className="item__link" title="Responses">
                {responseCount} <FaRegComment />
              </a>
            </li>
          )
        )}
      </ul>
    </>
  );
}

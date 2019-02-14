import React from "react";
import { FaRegComment } from "react-icons/fa";
import "./List.css";

export default function List({ items }) {
  return (
    <ul className="list">
      {items.map(({ link, title, points, responseCount, id, author }) => (
        <li className="list__item" key={id}>
          <span className="item__points">
            {points > 0 ? `+${points}` : points}
          </span>
          <div className="item__content">
            <a href={link} className="item__title">
              {title}
            </a>
            <span className="item__author">{author}</span>
          </div>
          <span>
            {responseCount} <FaRegComment />
          </span>
        </li>
      ))}
    </ul>
  );
}

import React from "react";
import styled from "styled-components/macro";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import Center from "./Center";
import Title from "./Title";
import Row from "./Row";
import Spinner from "./Spinner";
import Button from "./Button";
import Padding from "./Padding";
import { STATUSES } from "../constants/api";
import { Item } from "../constants/Item";
import { useDocumentTitle } from "../hooks/document";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 8px;
`;

const ListItem = styled.li`
  align-items: center;
  display: flex;
  min-height: 48px;
  padding: 4px 0;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
`;

const ItemSubtitle = styled.span`
  opacity: 0.8;
  font-size: 0.8rem;
`;

export default function Feed({
  status,
  items,
  title,
  onRefresh,
  onLoadMore
}: {
  status: string;
  items: Item[];
  title: string;
  onRefresh: () => void;
  onLoadMore?: () => void;
}) {
  useDocumentTitle(title);

  return (
    <>
      <Row crossAxisAlignment="center">
        <Padding padding={{ left: "8px", right: "8px" }}>
          <Title>{title}</Title>
        </Padding>
        {status === STATUSES.refreshing ? (
          <Spinner />
        ) : (
          <Button onClick={onRefresh} title="Refresh">
            <FaSyncAlt />
          </Button>
        )}
      </Row>
      <List>
        {items.map(
          ({ link, title, points, responseCount, id, author, description }) => (
            <ListItem key={id}>
              <ItemContent>
                <Title>
                  <ItemLink href={link} title="Title">
                    {title} {description && `— ${description}`}
                  </ItemLink>
                </Title>
                <div>
                  <ItemSubtitle title="Author">{author}</ItemSubtitle>
                  {points != null && (
                    <>
                      <span> • </span>
                      <ItemSubtitle title="Points">
                        {points} <FaRegArrowAltCircleUp />
                      </ItemSubtitle>
                    </>
                  )}
                  {responseCount != null && (
                    <>
                      <span> • </span>
                      <ItemSubtitle title="Responses">
                        {responseCount} <FaRegCommentAlt />
                      </ItemSubtitle>
                    </>
                  )}
                </div>
              </ItemContent>
            </ListItem>
          )
        )}
      </List>
      <Center>
        {status === STATUSES.loadingMore && <Spinner />}
        {onLoadMore && status === STATUSES.idle && (
          <Button onClick={onLoadMore}>Load more</Button>
        )}
      </Center>
    </>
  );
}

import React from "react";
import styled from "styled-components/macro";
import {
  FaRegCommentAlt,
  FaSyncAlt,
  FaRegArrowAltCircleUp
} from "react-icons/fa";
import Center from "./presentation/Center";
import Title from "./presentation/Title";
import Row from "./presentation/Row";
import Spinner from "./presentation/Spinner";
import Button from "./presentation/Button";
import Container from "./presentation/Container";
import { STATUSES } from "../constants/api";
import { Item } from "../constants/Item";
import { useDocumentTitle } from "../hooks/document";

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0 8px;
`;

const StyledListItem = styled.li`
  align-items: center;
  display: flex;
  min-height: 48px;
  padding: 4px 0;
`;

const ListItem = React.memo(
  ({
    link,
    title,
    author,
    description,
    points,
    responseCount
  }: {
    link: string;
    title: string;
    author: string;
    description: string;
    points: number;
    responseCount: number;
  }) => (
    <StyledListItem>
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
    </StyledListItem>
  )
);

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
      <Row>
        <Container padding={{ left: "8px", right: "8px" }}>
          <Title>{title}</Title>
        </Container>
        {status === STATUSES.refreshing ? (
          <Spinner />
        ) : (
          <Button onClick={onRefresh} title="Refresh">
            <FaSyncAlt />
          </Button>
        )}
      </Row>
      <List>
        {items.map(itemProps => (
          <ListItem {...itemProps} key={itemProps.id} />
        ))}
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

import React, { memo } from "react";
import {
  FaRegArrowAltCircleUp,
  FaRegCommentAlt,
  FaSyncAlt
} from "react-icons/fa";
import styled from "styled-components/macro";
import { Status, Item } from "./constants";
import { useDocumentTitle } from "../hooks/document";
import Button from "../presentation/Button";
import Center from "../presentation/Center";
import Container from "../presentation/Container";
import Row from "../presentation/Row";
import Spinner from "../presentation/Spinner";
import Title from "../presentation/Title";
import A from "../presentation/A";

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

const ListItem = memo(
  ({
    link,
    altLink,
    altLinkName,
    title,
    author,
    description,
    points,
    responseCount
  }: {
    link: string;
    altLink: string;
    altLinkName: string;
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
          {altLink != null && (
            <>
              <span> • </span>
              <ItemSubtitle title="Alternative link">
                <A href={altLink}>Read with {altLinkName}</A>
              </ItemSubtitle>
            </>
          )}
        </div>
      </ItemContent>
    </StyledListItem>
  )
);

const ItemContent = styled.article`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-wrap: break-word;
  width: 100%;
  word-wrap: break-word;
`;

const ItemLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
`;

const ItemSubtitle = styled.span`
  opacity: 0.8;
  font-size: 0.8rem;
`;

const Header = memo(
  ({
    title,
    status,
    handleRefresh
  }: {
    title: string;
    status: Status;
    handleRefresh: () => void;
  }) => (
    <Row>
      <Container padding={{ left: "8px", right: "8px" }}>
        <Title>{title}</Title>
      </Container>
      {status === Status.refreshing ? (
        <Spinner />
      ) : (
        <Button onClick={handleRefresh} title="Refresh">
          <FaSyncAlt />
        </Button>
      )}
    </Row>
  )
);

export default function Feed({
  status,
  items,
  title,
  onRefresh,
  onLoadMore
}: {
  status: Status;
  items: Item[];
  title: string;
  onRefresh: () => void;
  onLoadMore?: () => void;
}) {
  useDocumentTitle(title);

  return (
    <>
      <Header title={title} status={status} handleRefresh={onRefresh} />
      <List>
        {items.map(itemProps => (
          <ListItem {...itemProps} key={itemProps.id} />
        ))}
      </List>
      <Center>
        {status === Status.loadingMore && <Spinner />}
        {onLoadMore && status === Status.idling && (
          <Button onClick={onLoadMore}>Load more</Button>
        )}
      </Center>
    </>
  );
}

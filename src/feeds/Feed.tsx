import React, { memo } from "react";
import { FaRegArrowAltCircleUp, FaRegCommentAlt } from "react-icons/fa";
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
    origLink,
    altLink,
    altLinkName,
    title,
    author,
    description,
    points,
    responseCount,
  }: {
    link: string;
    origLink: string;
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
        <span>
          <Title>
            <ItemLink href={link} title="Title">
              {title} {description && `— ${description}`}
            </ItemLink>
          </Title>{" "}
          <Title size="0.8rem">
            {origLink != null && (
              <ItemLink href={origLink} title="Original link">
                [{getHostname(origLink)}]
              </ItemLink>
            )}
          </Title>
        </span>
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

// Credit: https://stackoverflow.com/a/54947757/3237113
function getHostname(urlString: string) {
  const matches = urlString.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  return matches && matches[1];
}

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
  ({ title, refreshing }: { title: string; refreshing: boolean }) => (
    <Center>
      <Container padding={{ top: "8px" }}>
        <Row>
          <Container padding={{ left: "8px", right: "8px" }}>
            <Title size="1.1rem">Informatif - {title}</Title>
          </Container>
          {refreshing && <Spinner />}
        </Row>
      </Container>
    </Center>
  )
);

export default function Feed({
  status,
  items,
  title,
  onLoadMore,
}: {
  status: Status;
  items: Item[];
  title: string;
  onLoadMore?: () => void;
}) {
  useDocumentTitle(title);

  return (
    <>
      <Header title={title} refreshing={status === Status.refreshing} />
      <List>
        {items.map((itemProps) => (
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

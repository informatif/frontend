import React, { memo, useCallback } from "react";
import useDarkMode from "use-dark-mode";
import Container from "../components/presentation/Container";
import Title from "../components/presentation/Title";
import { useLeftHandedMode, useDisplayedFeeds } from "./hooks";
import {
  DEFAULT_NIGHT_MODE,
  DEFAULT_LEFT_HANDED_MODE,
  FEED_ID_TO_TITLE,
  DEFAULT_DISPLAYED_FEED
} from "./constants";
import { FaMoon, FaTv, FaHandHolding } from "react-icons/fa";
import { IconType } from "react-icons/lib/iconBase";
import Row from "../components/presentation/Row";

const TogglePref = memo(
  ({
    id,
    Icon,
    title,
    description,
    handleChange,
    checked
  }: {
    id: string;
    Icon: IconType;
    title: string;
    description: string;
    handleChange: () => void;
    checked: boolean;
  }) => (
    <Container padding={{ top: "8px", bottom: "8px" }}>
      <label htmlFor={id}>
        <Row>
          <Container padding={{ right: "8px" }}>
            <Icon />
          </Container>
          <div>
            <Title colored>{title}</Title>
            <input
              type="checkbox"
              role="switch"
              id={id}
              onChange={handleChange}
              checked={checked}
            />
            <p>{description}</p>
          </div>
        </Row>
      </label>
    </Container>
  )
);

const ListPref = memo(
  ({
    Icon,
    title,
    items
  }: {
    Icon: IconType;
    title: string;
    items: {
      id: string;
      label: string;
      checked: boolean;
      handleChange: () => void;
    }[];
  }) => (
    <Container padding={{ top: "8px", bottom: "8px" }}>
      <Row>
        <Container padding={{ right: "8px" }}>
          <Icon />
        </Container>
        <div>
          <Title colored>{title}</Title>
          {items.map(({ id, label, checked, handleChange }) => (
            <Container padding={{ top: "2px", bottom: "2px" }} key={id}>
              <label htmlFor={id}>{label}</label>
              <input
                type="checkbox"
                role="switch"
                id={id}
                onChange={handleChange}
                checked={checked}
              />
            </Container>
          ))}
        </div>
      </Row>
    </Container>
  )
);

function NightModePref() {
  const { value, toggle } = useDarkMode(DEFAULT_NIGHT_MODE);
  return (
    <TogglePref
      id="night-mode"
      Icon={FaMoon}
      title="Night mode"
      description="Optimize color scheme for viewing in the dark"
      handleChange={toggle}
      checked={value}
    />
  );
}

function LeftHandedModePref() {
  const [enabled, setEnabled] = useLeftHandedMode(DEFAULT_LEFT_HANDED_MODE);
  const handleChange = useCallback(
    () => setEnabled(prevEnabled => !prevEnabled),
    [setEnabled]
  );
  return (
    <TogglePref
      id="left-handed-mode"
      Icon={FaHandHolding}
      title="Left-handed mode"
      description="Improve accessibility for left-handed use"
      handleChange={handleChange}
      checked={enabled}
    />
  );
}

function DisplayedFeedsPref() {
  const items = Object.keys(FEED_ID_TO_TITLE).map(id => {
    const [displayed, setDisplayed] = useDisplayedFeeds[id](
      DEFAULT_DISPLAYED_FEED
    );
    const handleChange = useCallback(
      () => setDisplayed(prevDisplayed => !prevDisplayed),
      [setDisplayed]
    );
    return {
      id,
      label: FEED_ID_TO_TITLE[id],
      checked: displayed,
      handleChange
    };
  });
  return <ListPref Icon={FaTv} title="Displayed feeds" items={items} />;
}

export default function Preferences() {
  return (
    <Container padding={{ left: "8px" }}>
      <Title>Preferences</Title>
      <NightModePref />
      <LeftHandedModePref />
      <DisplayedFeedsPref />
    </Container>
  );
}

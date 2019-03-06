import React, { memo, useCallback } from "react";
import { FaHandHolding, FaInfo, FaMoon, FaTv } from "react-icons/fa";
import { IconType } from "react-icons/lib/iconBase";
import useDarkMode from "use-dark-mode";
import Container from "../presentation/Container";
import Row from "../presentation/Row";
import Title from "../presentation/Title";
import {
  DEFAULT_DISPLAYED_FEED,
  DEFAULT_LEFT_HANDED_MODE,
  DEFAULT_NIGHT_MODE,
  FEED_ID_TO_TITLE
} from "./constants";
import { useDisplayedFeeds, useLeftHandedMode } from "./hooks";
import A from "../presentation/A";
import Center from "../presentation/Center";

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
            <Container padding={{ bottom: "4px" }}>
              <Title colored>{title}</Title>
              <input
                type="checkbox"
                id={id}
                onChange={handleChange}
                checked={checked}
              />
            </Container>
            <p>{description}</p>
          </div>
        </Row>
      </label>
    </Container>
  )
);

const ListPrefItem = memo(
  ({
    id,
    label,
    checked,
    handleChange
  }: {
    id: string;
    label: string;
    checked: boolean;
    handleChange: () => void;
  }) => (
    <Container padding={{ bottom: "2px" }}>
      <label htmlFor={id}>{label}</label>
      <input
        type="checkbox"
        id={id}
        onChange={handleChange}
        checked={checked}
      />
    </Container>
  )
);

const ListPref = ({
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
        <Container padding={{ bottom: "4px" }}>
          <Title colored>{title}</Title>
        </Container>
        {items.map(({ id, label, checked, handleChange }) => (
          <ListPrefItem
            key={id}
            id={id}
            label={label}
            checked={checked}
            handleChange={handleChange}
          />
        ))}
      </div>
    </Row>
  </Container>
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

const AboutPref = memo(() => (
  <Container padding={{ top: "8px", bottom: "8px" }}>
    <Row>
      <Container padding={{ right: "8px" }}>
        <FaInfo />
      </Container>
      <div>
        <Container padding={{ bottom: "4px" }}>
          <Title colored>About Informatif</Title>
        </Container>
        <p>Glanceable headlines for the media sources you care about.</p>
        <div>
          More links:{" "}
          <A href="https://github.com/informatif/informatif">GitHub Repo</A>
          {", "}
          <A href="https://zwliew.xyz">Myself</A>
        </div>
      </div>
    </Row>
  </Container>
));

const Header = memo(({ title }: { title: string }) => (
  <Center>
    <Container padding={{ left: "8px", right: "8px", top: "8px" }}>
      <Title size="1.1rem">Informatif - {title}</Title>
    </Container>
  </Center>
));

export default function Preferences() {
  return (
    <Container padding={{ left: "8px" }}>
      <Header title="Preferences" />
      <NightModePref />
      <LeftHandedModePref />
      <DisplayedFeedsPref />
      <AboutPref />
    </Container>
  );
}

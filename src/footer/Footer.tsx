import React, { ReactElement } from "react";
import styled from "styled-components/macro";
import {
  FaStackOverflow,
  FaHackerNews,
  FaNewspaper,
  FaReddit,
  FaGithub,
  FaCog
} from "react-icons/fa";
import AppNavLink from "./AppNavLink";
import { useLeftHandedMode, useDisplayedFeeds } from "../preferences/hooks";
import {
  DEFAULT_LEFT_HANDED_MODE,
  FEED_ID_TO_TITLE,
  DEFAULT_DISPLAYED_FEED
} from "../preferences/constants";

const StyledFooter = styled.footer`
  align-items: center;
  background: var(--background-color);
  bottom: 0;
  box-shadow: 0 -1px 4px 1px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  display: flex;
  list-style-type: none;
  margin: 0;
  min-height: 40px;
  position: fixed;
  justify-content: space-between;
  width: 100%;
`;

const PrefsLink = () => (
  <AppNavLink to="/prefs" title="Preferences">
    <FaCog />
  </AppNavLink>
);

const feedIdToIcon: {
  [index: string]: ReactElement;
} = {
  hn: <FaHackerNews />,
  gh: <FaGithub />,
  so: <FaStackOverflow />,
  reddit: <FaReddit />,
  global: <FaNewspaper />
};

export default function Footer() {
  const [leftHandedModeEnabled] = useLeftHandedMode(DEFAULT_LEFT_HANDED_MODE);

  return (
    <StyledFooter>
      {!leftHandedModeEnabled && <PrefsLink />}
      <div>
        {Object.keys(FEED_ID_TO_TITLE).map(id => {
          const [displayed] = useDisplayedFeeds[id](DEFAULT_DISPLAYED_FEED);
          return (
            displayed && (
              <AppNavLink to={`/${id}`} title={FEED_ID_TO_TITLE[id]} key={id}>
                {feedIdToIcon[id]}
              </AppNavLink>
            )
          );
        })}
      </div>
      {leftHandedModeEnabled && <PrefsLink />}
    </StyledFooter>
  );
}

import React, { ReactElement } from "react";
import {
  FaCog,
  FaGithub,
  FaHackerNews,
  FaNewspaper,
  FaReddit,
  FaStackOverflow,
  FaMedium
} from "react-icons/fa";
import styled from "styled-components/macro";
import {
  DEFAULT_DISPLAYED_FEED,
  DEFAULT_LEFT_HANDED_MODE,
  FEED_ID_TO_TITLE
} from "../preferences/constants";
import { useDisplayedFeeds, useLeftHandedMode } from "../preferences/hooks";
import AppNavLink from "./AppNavLink";

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
  global: <FaNewspaper />,
  medium: <FaMedium />
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

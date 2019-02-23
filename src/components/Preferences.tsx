import React from "react";
import useDarkMode from "use-dark-mode";
import Padding from "./Padding";
import Title from "./Title";
import { useLeftHandedMode } from "../hooks/prefs";
import Column from "./Column";

function TogglePref({
  id,
  title,
  description,
  handleChange,
  value
}: {
  id: string;
  title: string;
  description: string;
  handleChange: () => void;
  value: boolean;
}) {
  return (
    <Column>
      <Padding padding={{ top: "8px", bottom: "8px" }}>
        <label htmlFor={id}>
          <Title>{title}</Title>
          <input
            type="checkbox"
            role="switch"
            id={id}
            onChange={handleChange}
            checked={value}
          />
          <p>{description}</p>
        </label>
      </Padding>
    </Column>
  );
}

function NightModePref() {
  const { value, toggle } = useDarkMode(false);
  return (
    <TogglePref
      id="night-mode"
      title="Night mode"
      description="Optimize color scheme for viewing in the dark"
      handleChange={toggle}
      value={value}
    />
  );
}

function LeftHandedModePref() {
  const [enabled, setEnabled] = useLeftHandedMode(false);
  return (
    <TogglePref
      id="left-handed-mode"
      title="Left-handed mode"
      description="Improve accessibility for left-handed use"
      handleChange={() => setEnabled(prevEnabled => !prevEnabled)}
      value={enabled}
    />
  );
}

export default function Preferences() {
  return (
    <Padding padding={{ left: "8px" }}>
      <Title>Preferences</Title>
      <NightModePref />
      <LeftHandedModePref />
    </Padding>
  );
}

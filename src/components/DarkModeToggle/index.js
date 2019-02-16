import React from "react";
import {
  darkModeToggleCheckbox,
  darkModeToggleIcon
} from "./DarkModeToggle.module.css";
import useDarkMode from "use-dark-mode";

export default function DarkModeToggle() {
  const { value, toggle } = useDarkMode(false);

  return (
    <label title="Dark mode">
      <input
        type="checkbox"
        className={darkModeToggleCheckbox}
        checked={value}
        onChange={toggle}
      />
      <span className={darkModeToggleIcon}>{value ? "🌚" : "🌞"}</span>
    </label>
  );
}

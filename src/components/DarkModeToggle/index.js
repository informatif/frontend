import React from "react";
import {
  darkModeToggle,
  darkModeToggleCheckbox,
  darkModeToggleIcon
} from "./DarkModeToggle.module.css";
import useDarkMode from "use-dark-mode";

export default function DarkModeToggle() {
  const { value, toggle } = useDarkMode(false);

  return (
    <label title="Dark mode" className={darkModeToggle}>
      <input
        type="checkbox"
        className={darkModeToggleCheckbox}
        onChange={toggle}
      />
      <span className={darkModeToggleIcon}>{value ? "🌚" : "🌞"}</span>
    </label>
  );
}

import { useCallback, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "sqlquest_theme_mode";
const THEME_EVENT_NAME = "sqlquest-theme-change";

export function resolveEffectiveTheme(themePreference) {
  if (themePreference === "dark") return "dark";
  if (themePreference === "light") return "light";
  if (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function getStoredThemePreference() {
  try {
    const direct = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (direct === "light" || direct === "dark" || direct === "system") {
      return direct;
    }
  } catch {
    // Ignore storage read errors
  }
  return "light";
}

export function applyThemePreference(themePreference) {
  const effective = resolveEffectiveTheme(themePreference);
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("data-theme", effective);
    document.body.classList.toggle("dark-mode", effective === "dark");
  }
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, themePreference);
    window.dispatchEvent(
      new CustomEvent(THEME_EVENT_NAME, { detail: themePreference })
    );
  } catch {
    // Ignore storage write errors
  }
  return effective;
}

export function useTheme() {
  const [theme, setThemeState] = useState(() => getStoredThemePreference());

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  useEffect(() => {
    const handleCustomChange = (event) => {
      if (event.detail && event.detail !== theme) {
        setThemeState(event.detail);
      }
    };

    const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
    const handleSystemChange = () => {
      if (getStoredThemePreference() === "system") {
        applyThemePreference("system");
      }
    };

    window.addEventListener(THEME_EVENT_NAME, handleCustomChange);
    mediaQuery?.addEventListener?.("change", handleSystemChange);

    return () => {
      window.removeEventListener(THEME_EVENT_NAME, handleCustomChange);
      mediaQuery?.removeEventListener?.("change", handleSystemChange);
    };
  }, [theme]);

  const setTheme = useCallback((nextTheme) => {
    setThemeState(nextTheme);
    applyThemePreference(nextTheme);
  }, []);

  const resolvedTheme = resolveEffectiveTheme(theme);
  const isDark = resolvedTheme === "dark";

  const toggleDarkMode = useCallback(() => {
    const next = resolveEffectiveTheme(theme) === "dark" ? "light" : "dark";
    setTheme(next);
  }, [theme, setTheme]);

  return {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleDarkMode,
    toggleTheme: toggleDarkMode,
  };
}


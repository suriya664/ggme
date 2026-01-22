(() => {
  const storageKey = "gds-theme";
  const root = document.documentElement;
  const toggles = document.querySelectorAll(".theme-toggle");

  const getPreferredTheme = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      return stored;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const updateToggle = (theme) => {
    toggles.forEach((button) => {
      const icon = button.querySelector("i");
      const label = button.querySelector("span");
      if (theme === "dark") {
        if (icon) icon.className = "bi bi-sun";
        if (label) label.textContent = "Light";
        button.setAttribute("aria-label", "Switch to light mode");
      } else {
        if (icon) icon.className = "bi bi-moon-stars";
        if (label) label.textContent = "Dark";
        button.setAttribute("aria-label", "Switch to dark mode");
      }
    });
  };

  const setTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-bs-theme", theme);
    localStorage.setItem(storageKey, theme);
    updateToggle(theme);
  };

  const init = () => {
    setTheme(getPreferredTheme());
    toggles.forEach((button) => {
      button.addEventListener("click", () => {
        const current = root.getAttribute("data-theme") || "light";
        setTheme(current === "dark" ? "light" : "dark");
      });
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

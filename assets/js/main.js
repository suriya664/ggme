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

  const highlightActiveNav = () => {
    const path = decodeURIComponent(window.location.pathname);
    const currentFile = path.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll(".navbar a.nav-link, .navbar .dropdown-item");

    navItems.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#") || href.startsWith("http")) {
        return;
      }
      const hrefFile = href.split("/").pop();
      if (hrefFile === currentFile) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");

        const dropdown = link.closest(".dropdown");
        if (dropdown) {
          const toggle = dropdown.querySelector(".nav-link.dropdown-toggle");
          if (toggle) {
            toggle.classList.add("active");
            toggle.setAttribute("aria-current", "page");
          }
        }
      }
    });
  };

  const init = () => {
    setTheme(getPreferredTheme());
    highlightActiveNav();
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

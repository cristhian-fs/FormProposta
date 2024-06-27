export function handleTheme() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  let themeToggleBtns = document.querySelectorAll("button[data-theme]");

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.dataset.theme;

      if (theme === "light") {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else if (theme === "dark") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    });
  });
}

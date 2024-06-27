import { initServiceInput } from "./modules/services-input.js";

document.addEventListener("DOMContentLoaded", (e) => {
  // INIT INPUTS
  initServiceInput();

  // OPEN MENU IN MOBILE DEVICES
  const menuButton = document.querySelector("[data-menu-button]");
  const menuMobile = document.querySelector("#mobile-menu");

  let isMenuOpen = false;

  menuButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!isMenuOpen) {
      menuMobile.classList.add("opened-menu");
      menuButton.classList.add("open-menu");
      isMenuOpen = true;
    } else {
      menuMobile.classList.remove("opened-menu");
      menuButton.classList.remove("open-menu");
      isMenuOpen = false;
    }
  });

  document.addEventListener("click", (event) => {
    // Verifica se o clique ocorreu dentro do optionsTheme
    if (
      !menuButton.contains(event.target) &&
      !menuMobile.contains(event.target) &&
      isMenuOpen
    ) {
      menuMobile.classList.remove("opened-menu");
      isMenuOpen = false;
    }
  });
});

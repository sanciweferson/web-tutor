import {
  setupMenuToggle,
  setupMenuStateOnLoad,
  setupMenuResizeHandler,
  setupMobileLinkClicks
} from "./menuActions.js";

export const initMenu = () => {
  const checkInterval = setInterval(() => {
    const toggleBtn = document.getElementById("menu__toggle");
    const sideMenu = document.getElementById("mobile__side");

    if (toggleBtn && sideMenu) {
      setupMenuToggle();
      setupMenuStateOnLoad(); // Verifica o localStorage aqui
      setupMenuResizeHandler();
      setupMobileLinkClicks();

      clearInterval(checkInterval);
    }
  }, 50);

  setTimeout(() => clearInterval(checkInterval), 5000);
};
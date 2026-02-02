// menuEvents.js
import {
  setupMenuToggle as setupToggle,
  setupMenuStateOnLoad as setupState,
  setupMenuResizeHandler as setupResize,
  setupMobileLinkClicks as setupLinks,
} from "./menuActions.js"

export const initMenu = () => {
  // Função que espera os elementos existirem no DOM
  const waitForMenuElements = setInterval(() => {
    const toggle = document.getElementById("menu__toggle")
    const side = document.getElementById("mobile__side")

    if (toggle && side) {
      // Inicializa todas as funcionalidades do menu
      setupToggle()
      setupState()
      setupResize()
      setupLinks()

      clearInterval(waitForMenuElements)
    }
  }, 50) // checa a cada 50ms
}
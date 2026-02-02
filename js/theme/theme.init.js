import {
  applyEffectiveTheme,
  toggleTheme,
  setupSystemThemeObserver,
} from "./theme.core.js"

// Função auxiliar para configurar os botões de tema
const setupThemeButton = (buttonId) => {
  const button = document.getElementById(buttonId)
  if (!button) return

  const updateAriaLabel = (isDark) => {
    button.setAttribute(
      "aria-label",
      isDark ? "Alternar para tema claro" : "Alternar para tema escuro"
    )
  }

  button.addEventListener("click", () => {
    toggleTheme()
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark"
    updateAriaLabel(isDark)
  })

  const isDark = document.documentElement.getAttribute("data-theme") === "dark"
  updateAriaLabel(isDark)
}

const initDesktopThemeToggle = () => setupThemeButton("toggle__desktop")
const initMobileThemeToggle = () => setupThemeButton("toggle__mobile")

// Inicializa todo o sistema de tema
export const initTheme = () => {
  applyEffectiveTheme() // Aplica o tema primeiro

  // Espera o DOM aplicar o tema antes de configurar os botões
  setTimeout(() => {
    initDesktopThemeToggle() // Configura botão desktop
    initMobileThemeToggle() // Configura botão mobile
    setupSystemThemeObserver() // Observa mudanças do sistema
  }, 50) // 50ms é suficiente para sincronizar com o DOM
}
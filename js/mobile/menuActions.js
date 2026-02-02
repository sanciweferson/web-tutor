// menuActions.js

export const MOBILE_BREAKPOINT = 768

// Função para pegar os elementos do menu
const getMenuElements = () => {
  const menuToggleButton = document.getElementById("menu__toggle")
  const sideMenu = document.getElementById("mobile__side")
  return { menuToggleButton, sideMenu }
}

// Abre o menu mobile
export const openSideMenu = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  sideMenu.classList.add("open")
  sideMenu.removeAttribute("aria-hidden")
  sideMenu.removeAttribute("inert")

  menuToggleButton.innerHTML = "&times;"
  menuToggleButton.setAttribute("aria-expanded", "true")

  // Move o foco para dentro do menu (acessibilidade)
  const firstLink = sideMenu.querySelector("a[href]")
  if (firstLink) firstLink.focus()

  localStorage.setItem("menuOpen", "true")
}

// Fecha o menu mobile
export const closeSideMenu = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  // Remove foco de qualquer elemento dentro do menu
  const focusedInside = sideMenu.querySelector(":focus")
  if (focusedInside) focusedInside.blur()

  // Devolve o foco para o botão do menu
  menuToggleButton.focus()

  sideMenu.classList.remove("open")
  sideMenu.setAttribute("aria-hidden", "true")
  sideMenu.setAttribute("inert", "")

  menuToggleButton.innerHTML = "&#9776;"
  menuToggleButton.setAttribute("aria-expanded", "false")

  localStorage.setItem("menuOpen", "false")
}

// Configura o botão de toggle
export const setupMenuToggle = () => {
  const { menuToggleButton, sideMenu } = getMenuElements()
  if (!menuToggleButton || !sideMenu) return

  menuToggleButton.addEventListener("click", () => {
    const isOpen = sideMenu.classList.contains("open")
    isOpen ? closeSideMenu() : openSideMenu()
  })
}

// Mantém o estado do menu salvo no localStorage mesmo após reload
export const setupMenuStateOnLoad = () => {
  const { sideMenu } = getMenuElements()
  if (!sideMenu) return

  setTimeout(() => {
    const menuOpenSaved = localStorage.getItem("menuOpen") === "true"
    if (menuOpenSaved) {
      openSideMenu()
    } else {
      closeSideMenu()
    }
  }, 50)
}

// Fecha o menu automaticamente se a tela aumentar além do breakpoint
export const setupMenuResizeHandler = () => {
  window.addEventListener("resize", () => {
    const { sideMenu } = getMenuElements()
    if (!sideMenu) return

    if (
      window.innerWidth > MOBILE_BREAKPOINT &&
      sideMenu.classList.contains("open")
    ) {
      closeSideMenu()
    }
  })
}

// Fecha o menu ao clicar em qualquer link do mobile e faz scroll suave
export const setupMobileLinkClicks = () => {
  const { sideMenu } = getMenuElements()
  if (!sideMenu) return

  const links = sideMenu.querySelectorAll("a[href]")
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href")

      // Fecha o menu com coreografia completa (foco + aria)
      closeSideMenu()

      if (href.startsWith("#")) {
        event.preventDefault()
        const target = document.querySelector(href)
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: "smooth" })
          }, 200)
        }
      }
    })
  })
}

// Inicializa o menu quando o DOM estiver pronto
export const initMenu = () => {
  window.addEventListener("load", () => {
    setupMenuToggle()
    setupMenuStateOnLoad()
    setupMenuResizeHandler()
    setupMobileLinkClicks()
  })
}

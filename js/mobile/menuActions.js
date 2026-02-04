export const MOBILE_BREAKPOINT = 768;

const getMenuElements = () => {
  return {
    btn: document.getElementById("menu__toggle"),
    side: document.getElementById("mobile__side")
  };
};

const handleKeyboardFocus = (e) => {
  const { btn, side } = getMenuElements();
  if (!side || !side.classList.contains("open")) return;

  if (e.key === "Escape") {
    closeSideMenu();
    return;
  }

  if (e.key === "Tab") {
    const focusables = Array.from(
      side.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])')
    );

    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    // Shift + Tab no primeiro item → volta para o botão
    if (e.shiftKey && document.activeElement === first) {
      btn.focus();
      e.preventDefault();
    }

    // Tab no botão → vai para o primeiro link do menu
    if (!e.shiftKey && document.activeElement === btn) {
      first.focus();
      e.preventDefault();
    }

    // Tab no último item → volta para o botão
    if (!e.shiftKey && document.activeElement === last) {
      btn.focus();
      e.preventDefault();
    }
  }
};

export const openSideMenu = (isInitialLoad = false) => {
  const { btn, side } = getMenuElements();
  if (!btn || !side) return;

  side.classList.add("open");
  side.removeAttribute("aria-hidden");
  side.removeAttribute("inert");

  btn.setAttribute("aria-expanded", "true");
  btn.innerHTML = "&times;";
  btn.setAttribute("aria-label", "Fechar menu");

  document.addEventListener("keydown", handleKeyboardFocus);

  if (!isInitialLoad) {
    const firstLink = side.querySelector('a[href], button');
    (firstLink || btn).focus();
  }

  localStorage.setItem("menuOpen", "true");
};

export const closeSideMenu = () => {
  const { btn, side } = getMenuElements();
  if (!btn || !side) return;

  // Tira o foco de dentro do menu antes de escondê-lo
  if (side.contains(document.activeElement)) {
    btn.focus();
  }

  side.classList.remove("open");
  side.setAttribute("aria-hidden", "true");
  side.setAttribute("inert", "");

  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "&#9776;";
  btn.setAttribute("aria-label", "Abrir menu");

  document.removeEventListener("keydown", handleKeyboardFocus);
  localStorage.setItem("menuOpen", "false");
};

export const setupMenuToggle = () => {
  const { btn, side } = getMenuElements();

  btn?.addEventListener("click", () => {
    side.classList.contains("open") ? closeSideMenu() : openSideMenu();
  });
};

export const setupMenuStateOnLoad = () => {
  const isMenuOpen = localStorage.getItem("menuOpen") === "true";

  if (isMenuOpen && window.innerWidth <= MOBILE_BREAKPOINT) {
    openSideMenu(true);
  } else {
    closeSideMenu();
  }
};

export const setupMenuResizeHandler = () => {
  window.addEventListener("resize", () => {
    const { side } = getMenuElements();

    if (window.innerWidth > MOBILE_BREAKPOINT && side?.classList.contains("open")) {
      closeSideMenu();
    }
  });
};

export const setupMobileLinkClicks = () => {
  const { side } = getMenuElements();

  side?.querySelectorAll("a[href]").forEach(link => {
    link.addEventListener("click", () => closeSideMenu());
  });
};

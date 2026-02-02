// ---------- templates ----------
function menuItemMobile({ href, icon, text, extraClass = "" }) {
  // adiciona classe baseada no texto (Facebook, Instagram)
  const networkClass = text.toLowerCase(); // "facebook" ou "instagram"
  return `
    <li class="nav__item">
      <a href="${href}" class="menu__link ${extraClass}">
        <i class="icon ${icon}" aria-hidden="true"></i>
        <span>${text}</span>
      </a>
    </li>
  `;
}

function menuItemDesktop({ href, text, extraClass = "" }) {
  return `
    <li class="nav__item">
      <a href="${href}" class="menu__link ${extraClass}">
        <span>${text}</span>
      </a>
    </li>
  `;
}

// Adicionando classe da rede social para cor oficial
function socialItem({ href, icon, text }) {
  const networkClass = text.toLowerCase(); // "facebook" ou "instagram"
  return `
    <li class="nav__item">
      <a href="${href}" class="menu__link link__primary ${networkClass}" target="_blank" rel="noopener">
        <i class="icon ${icon}" aria-hidden="true"></i>
        <span class="sr-only">${text}</span>
      </a>
    </li>
  `;
}

function footerLinkItem({ href, text }) {
  return `<a href="${href}" class="footer-link">${text}</a>`;
}

// ---------- dados base (fonte única da verdade) ----------
const navLinks = [
  { id: "home", href: "/index.html", text: "Home", icon: "fa-solid fa-house" },
  { id: "chapters", href: "/index.html#chapters", text: "Chapters", icon: "fa-solid fa-list" },
  { id: "summary", href: "/index.html#summary", text: "Summary", icon: "fa-solid fa-align-left" },
  { id: "takeaways", href: "/index.html#takeaways", text: "Takeaways", icon: "fa-solid fa-lightbulb" },
  { id: "author", href: "/index.html#author", text: "Author", icon: "fa-solid fa-user" },
  { id: "contato", href: "/index.html?pagina=contato", text: "Contato", icon: "fa-solid fa-envelope" }
];

const socialItems = [
  { href: "https://www.facebook.com/", icon: "fa-brands fa-facebook", text: "Facebook" },
  { href: "https://www.instagram.com/", icon: "fa-brands fa-instagram", text: "Instagram" }
];

// ---------- componente NAV ----------
class NavBar extends HTMLElement {
  connectedCallback() {
    const mobileLinks = navLinks.map(menuItemMobile).join("");
    const desktopLinks = navLinks.map(menuItemDesktop).join("");
    const socialLinks = socialItems.map(socialItem).join("");

    this.innerHTML = `
      <nav class="nav container">
        <div class="logo">
          <img src="../../assets/img/logo.svg" alt="logo" />
        </div>

        <div class="nav__mobile__toggle">
          <button class="menu__toggle" id="menu__toggle">&#9776;</button>
        </div>

        <!-- DESKTOP -->
        <div id="nav__desktop">
          <ul class="nav__list nav__list--desktop">
            ${desktopLinks}
          </ul>

          <div class="nav__actions">
            <ul class="nav__social">
              ${socialLinks}
            </ul>

            <div class="nav__theme__desktop">
              <button id="toggle__desktop" aria-label="Alternar tema">
              <svg
                class="icon-theme icon-moon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                height="29px"
                fill="#4B5563"
                width="29px"
              >
                <path
                  d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
                />
              </svg>

              <svg
                class="icon-theme icon-sun hidden"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                height="29px"
                fill="#FBBF24"
                width="29px"
              >
                <path
                  d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z"
                />
              </svg>
            </button>
              </button>
            </div>
          </div>
        </div>

        <!-- MOBILE -->
        <aside id="mobile__side" aria-hidden="true" inert>
          <div class="nav__links__mobile">
            <ul class="nav__list">
              ${mobileLinks}
              ${socialLinks}
            </ul>

            <div class="nav__theme__mobile">
             <button id="toggle__mobile" aria-label="Alternar tema">
                  <svg
                    class="icon-theme icon-moon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    height="29px"
                    width="29px"
                    fill="#4B5563"
                  >
                    <path
                      d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"
                    />
                  </svg>

                  <svg
                    class="icon-theme icon-sun hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                    height="29px"
                    width="29px"
                    fill="#FBBF24"
                  >
                    <path
                      d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z"
                    />
                  </svg>
                </button>
            </div>
          </div>
        </aside>
      </nav>
    `;
  }
}

customElements.define("nav-bar", NavBar);


class FooterBar extends HTMLElement {
  connectedCallback() {
    const year = new Date().getFullYear();

    // links de páginas no footer
    const footerLinks = navLinks
      .filter(link => ["home", "chapters", "summary", "takeaways", "author", "contato"].includes(link.id))
      .map(link => `
        <a href="${link.href}" class="footer-link"  >
          <i class="icon ${link.icon}"  aria-hidden="true"></i>
          ${link.text}
        </a>
      `)
      .join("  ");

    // links de redes sociais no footer (com ícone)
    const footerSocial = socialItems
      .map(({ href, icon, text }) => `
        <a 
          href="${href}" 
          class="footer-social-link" 
          
          target="_blank" 
          rel="noopener"
          aria-label="${text}"
        >
          <i class="icon ${icon}" aria-hidden="true"></i>
        </a>
      `)
      .join("");

    this.innerHTML = `
      <footer class="footer">
        <nav class="footer-nav">
          ${footerLinks}
        </nav>

        <div class="footer-social">
          ${footerSocial}
        </div>

        <div class="footer-copy">
          <span>© ${year} • Feito com JavaScript puro</span>
        </div>
      </footer>
    `;
  }
}

customElements.define("footer-bar", FooterBar);

// ---------- templates ----------


const ICONS = {
  home: `
    <svg class="icon home" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 2 12h3v9h6v-6h2v6h6v-9h3z"/>
    </svg>
  `,
  list: `
    <svg class="icon " viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 5h18v2H3zm0 6h18v2H3zm0 6h18v2H3z"/>
    </svg>
  `,
  text: `
    <svg class="icon " viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 5h16v2H4zm0 4h16v2H4zm0 4h10v2H4z"/>
    </svg>
  `,
  bulb: `
    <svg class="icon " viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 21h6v-1H9zm3-20C7.935 1 5 3.935 5 7c0 2.386 1.19 4.486 3 5.74V17h8v-4.26c1.81-1.254 3-3.354 3-5.74 0-3.065-2.935-6-7-6z"/>
    </svg>
  `,
  user: `
    <svg class="icon usu" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
    </svg>
  `,
  mail: `
    <svg class="icon con" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 4h20v16H2zm10 7L4 6v12h16V6z"/>
    </svg>
  `,
  facebook: `
    <svg class=" face " viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2V9.5c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
    </svg>
  `,
  instagram: `
  <svg class=" insta" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  `,
    github: `
    <svg class=" git" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.57.11.78-.25.78-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.07 0 0 .97-.31 3.18 1.18a11.02 11.02 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.6.24 2.78.12 3.07.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.69.42.36.79 1.08.79 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.68.79.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z"/>
    </svg>
  `
};
function menuItemMobile({ href, icon, text, extraClass = "" }) {
  return `
    <li class="nav__item">
      <a href="${href}" class="menu__link ${extraClass}">
        ${ICONS[icon]}
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
function socialItem({ href, icon, text }) {
  const networkClass = text.toLowerCase();
  return `
    <li class="nav__item">
      <a href="${href}" class="menu__link link__primary ${networkClass}" target="_blank" rel="noopener" aria-label="${text}">
        ${ICONS[icon]}
        <span class="sr-only">${text}</span>
      </a>
    </li>
  `;
}

// ---------- dados base ----------
const navLinks = [
  { id: "home", href: "/index.html", text: "Home", icon: "home" },
  { id: "chapters", href: "/index.html#chapters", text: "Chapters", icon: "list" },
  { id: "summary", href: "/index.html#summary", text: "Summary", icon: "text" },
  { id: "takeaways", href: "/index.html#takeaways", text: "Takeaways", icon: "bulb" },
  { id: "author", href: "/index.html#author", text: "Author", icon: "user" },
  { id: "contato", href: "/index.html?pagina=contato", text: "Contato", icon: "mail" }
];

const socialItems = [
  { href: "https://www.facebook.com/", icon: "facebook", text: "" },
  { href: "https://www.instagram.com/", icon: "instagram", text: "" },
  { href: "https://www.github.com/", icon: "github", text: "" }
];


// ---------- componente NAV ----------
class NavBar extends HTMLElement {
  connectedCallback() {
    const mobileLinks = navLinks.map(menuItemMobile).join("");
    const desktopLinks = navLinks.map(menuItemDesktop).join("");
    const socialLinks = socialItems.map(socialItem).join("");

    this.innerHTML = `
      <nav class="nav container" aria-label="Navegação Principal">
       <div class="logo">
      <a href="/index.html" class="logo__link" aria-label="Ir para a página inicial">
        <img src="../../assets/img/logo.svg" alt="Logotipo" />
      </a>
    </div>

        <div class="nav__mobile__toggle">
          <button class="menu__toggle" id="menu__toggle" aria-expanded="false" aria-controls="mobile__side" aria-label="Abrir menu">
            &#9776;
          </button>
        </div>

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
                <svg class="icon-theme icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="29px" fill="#4B5563" width="29px">
                  <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z" />
                </svg>
                <svg class="icon-theme icon-sun hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="29px" fill="#FBBF24" width="29px">
                  <path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <aside id="mobile__side" aria-hidden="true" inert>
          <div class="nav__links__mobile">
            <ul class="nav__list">
              ${mobileLinks}
              ${socialLinks}
            </ul>
            <div class="nav__theme__mobile">
                 <button id="toggle__mobile" aria-label="Alternar tema claro/escuro">
              <svg class="icon-theme icon-moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="29px" fill="#4B5563" width="29px">
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>
              </svg>

              <svg class="icon-theme icon-sun hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" height="29px" fill="#FBBF24" width="29px">
                <path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z"/>
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
    const footerLinks = navLinks
      .map(link => `
        <a href="${link.href}" class="footer-link">
          ${ICONS[link.icon]}
          <span>${link.text}</span>
        </a>
      `)
      .join(" ");

    this.innerHTML = `
      <footer class="footer">
        <nav class="footer-nav">${footerLinks}</nav>
        <div class="footer-copy">
          <span>© ${year} • Feito com JavaScript puro</span>
        </div>
      </footer>
    `;
  }
}
customElements.define("footer-bar", FooterBar);
function configurarScroll() {
  const header = document.querySelector(".header");
  const sidebar = document.querySelector(".sidebar");

  if (!header) {
    setTimeout(configurarScroll, 50);
    return;
  }

  function atualizarEstadoScroll() {
    // Agora pegamos o scroll da janela global (window)
    const y = window.scrollY || document.documentElement.scrollTop;

    if (y > 10) {
      header.classList.add("scrolled");
      sidebar?.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
      sidebar?.classList.remove("scrolled");
    }
  }

  // Escuta o scroll da janela toda
  window.addEventListener("scroll", atualizarEstadoScroll);
  atualizarEstadoScroll();
}

document.addEventListener("DOMContentLoaded", configurarScroll);

// ===============================
// BOTÃO VOLTAR AO TOPO + PROGRESSO (Global)
// ===============================

const btnTop = document.getElementById("btn-top");

if (btnTop) {
  const progressCircle = btnTop.querySelector(".progress");
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  progressCircle.style.strokeDasharray = circumference;

  function atualizarProgresso() {
    // Scroll atual da página inteira
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // Altura total rolável da página menos a altura da tela visível
    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const progresso = alturaTotal > 0 ? scrollTop / alturaTotal : 0;
    const offset = circumference - progresso * circumference;

    progressCircle.style.strokeDashoffset = offset;

    // Mostra o botão após descer 200px
    if (scrollTop > 200) {
      btnTop.classList.add("show");
    } else {
      btnTop.classList.remove("show");
    }
  }

  btnTop.addEventListener("click", () => {
    // Rola a janela para o topo
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  window.addEventListener("scroll", atualizarProgresso);
  atualizarProgresso();
}

let app;
let homeHTML;
let paginaAtual = null;

function capturarHome() {
  app = document.getElementById("app");
  homeHTML = app.innerHTML;
}

window.addEventListener("DOMContentLoaded", () => {
  capturarHome();
  carregarEstado();
});

// ===============================
// INTERCEPTA CLIQUES
// ===============================
document.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href) return;

  // ignora links externos
  if (href.startsWith("http")) return;

  // ===== HASH (#servicos)
  if (href.includes("#")) {
    e.preventDefault();
    const id = href.split("#")[1];

    history.pushState(null, "", "/index.html#" + id);

    app.innerHTML = homeHTML;
    paginaAtual = null;

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);

    return;
  }

  // ===== ROTAS SPA (?pagina=)
  if (href.includes("?pagina=")) {
    e.preventDefault();

    const pagina = new URL(href, location.origin).searchParams.get("pagina");
    if (!pagina || pagina === paginaAtual) return;

    paginaAtual = pagina;
    history.pushState(null, "", "/index.html?pagina=" + pagina);
    carregarPagina(pagina);
  }
});

// ===============================
// CARREGA PÁGINA
// ===============================
function carregarPagina(pagina) {
  const url = "/partials/pages/" + pagina + "/index.html";

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar");
      return res.text();
    })
    .then(html => {
      app.innerHTML = html;
      window.scrollTo(0, 0);
      document.title = "Meu site — " + pagina;

      carregarScriptDaPagina(pagina);
      carregarCSSDaPagina(pagina);
    })
    .catch(err => {
      console.error("Erro no fetch:", err);
      app.innerHTML = "<h2>Página não encontrada</h2>";
    });
}

// ===============================
// VOLTAR / AVANÇAR
// ===============================
window.addEventListener("popstate", carregarEstado);

// ===============================
// AO ABRIR / ATUALIZAR
// ===============================
function carregarEstado() {
  if (!app) capturarHome();

  // HASH
  if (location.hash) {
    app.innerHTML = homeHTML;
    paginaAtual = null;

    const id = location.hash.slice(1);
    const section = document.getElementById(id);

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 50);
    }
    return;
  }

  // ?pagina=
  const pagina = new URLSearchParams(location.search).get("pagina");

  if (pagina) {
    paginaAtual = pagina;
    carregarPagina(pagina);
  } else {
    app.innerHTML = homeHTML;
    paginaAtual = null;
    document.title = "Meu site";
  }
}

// ===============================
// JS DA PÁGINA
// ===============================
function carregarScriptDaPagina(pagina) {
  const caminho = "/partials/pages/" + pagina + "/index.js";

  const antigo = document.getElementById("script-pagina");
  if (antigo) antigo.remove();

  const script = document.createElement("script");
  script.src = caminho;
  script.id = "script-pagina";

  script.onerror = () => script.remove();
  document.body.appendChild(script);
}

// ===============================
// CSS DA PÁGINA
// ===============================
function carregarCSSDaPagina(pagina) {
  const caminho = "/partials/pages/" + pagina + "/index.css";

  const antigo = document.getElementById("css-pagina");
  if (antigo) antigo.remove();

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = caminho;
  link.id = "css-pagina";

  link.onerror = () => link.remove();
  document.head.appendChild(link);
}





const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const FORTUNE_CATEGORY_PARAM = "category";

document.addEventListener("DOMContentLoaded", () => {
  buildStarfield();
  setActiveNavLink();
  wireNavbarCollapse();
  wireNavbarScrollShadow();
});

function buildStarfield() {
  const layer = document.getElementById("starsLayer");
  if (!layer) return;
  for (let i = 0; i < 24; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.position = "fixed";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 4.5}s`;
    s.style.animationDuration = `${4 + Math.random() * 3}s`;
    layer.appendChild(s);
  }
}

function setActiveNavLink() {
  const links = document.querySelectorAll(".oracle-nav-links .nav-link");
  let currentPage = window.location.pathname.split("/").pop();
  if (currentPage === "" ) currentPage = "index.html";

  links.forEach((link) => {
    const linkPage = (link.getAttribute("href") || "").split("/").pop();
    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}

function wireNavbarCollapse() {
  document.querySelectorAll(".oracle-nav-links .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      const collapseEl = document.getElementById("oracleNavContent");
      if (collapseEl && collapseEl.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });
}

function wireNavbarScrollShadow() {
  const nav = document.querySelector(".oracle-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      nav.style.background = "rgba(8,5,26,0.92)";
      nav.style.paddingTop = ".4rem";
      nav.style.paddingBottom = ".4rem";
    } else {
      nav.style.background = "rgba(8,5,26,0.75)";
      nav.style.paddingTop = ".6rem";
      nav.style.paddingBottom = ".6rem";
    }
  });
}

async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function imgUrl(query) {
  const keywords = encodeURIComponent(query);
  return `https://loremflickr.com/640/640/${keywords}`;
}

function spawnSparkles(container, count) {
  if (!container) return;
  for (let i = 0; i < count; i++) {
    const s = document.createElement("span");
    s.className = "sparkle";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 1.2}s`;
    container.style.position = container.style.position || "relative";
    container.appendChild(s);
    setTimeout(() => s.remove(), 5200);
  }
}

function setAura(hex) {
  document.documentElement.style.setProperty("--aura", hex);
}

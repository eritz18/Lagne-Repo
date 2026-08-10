const SECRETS_STORAGE_KEY = "oracleSecretsUnlocked";
let SECRETS_DATA = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    SECRETS_DATA = await loadJSON("data/secrets.json");
  } catch (err) {
    console.error("The hidden archive could not be reached:", err);
    return;
  }

  wireBrandGlyphSecret();
  wireWhisperedWordSecret();
  renderSecretsBadge();
});

function wireBrandGlyphSecret() {
  const glyph = document.querySelector(".footer-oracle-glyph");
  if (!glyph) return;

  glyph.style.cursor = "pointer";

  let clicks = 0;
  let resetTimer = null;
  const NEEDED = 7;
  const WINDOW_MS = 3000;

  glyph.addEventListener("click", () => {
    clicks++;
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { clicks = 0; }, WINDOW_MS);

    if (clicks >= NEEDED) {
      clicks = 0;
      clearTimeout(resetTimer);
      revealSecret("thirteenth-sigil");
    }
  });
}

function wireWhisperedWordSecret() {
  const target = "aether";
  let buffer = "";

  document.addEventListener("keydown", (e) => {
    const tag = (document.activeElement && document.activeElement.tagName) || "";
    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return;
    if (e.key.length !== 1) return;

    buffer = (buffer + e.key.toLowerCase()).slice(-target.length);
    if (buffer === target) {
      buffer = "";
      revealSecret("whisper-of-aether");
    }
  });
}

function getUnlockedSecrets() {
  try {
    return JSON.parse(localStorage.getItem(SECRETS_STORAGE_KEY)) || [];
  } catch (err) {
    return [];
  }
}

function markSecretUnlocked(id) {
  const unlocked = getUnlockedSecrets();
  if (!unlocked.includes(id)) {
    unlocked.push(id);
    localStorage.setItem(SECRETS_STORAGE_KEY, JSON.stringify(unlocked));
  }
}

function renderSecretsBadge() {
  const footer = document.querySelector(".oracle-footer");
  if (!footer || !SECRETS_DATA) return;

  const unlocked = getUnlockedSecrets();
  const badge = document.createElement("p");
  badge.className = "secrets-badge";
  badge.id = "secretsBadge";
  badge.textContent = `\u2726 Hidden Secrets Found: ${unlocked.length}/${SECRETS_DATA.length}`;
  footer.appendChild(badge);
}

function updateSecretsBadge() {
  const badge = document.getElementById("secretsBadge");
  if (!badge || !SECRETS_DATA) return;
  const unlocked = getUnlockedSecrets();
  badge.textContent = `\u2726 Hidden Secrets Found: ${unlocked.length}/${SECRETS_DATA.length}`;
}

function revealSecret(id) {
  const secret = SECRETS_DATA && SECRETS_DATA.find((s) => s.id === id);
  if (!secret) return;

  markSecretUnlocked(id);
  updateSecretsBadge();

  const overlay = document.createElement("div");
  overlay.className = "hidden-gate-overlay";
  overlay.innerHTML = `
    <div class="hidden-gate-particles"></div>
    <div class="hidden-gate-rays"></div>
    <div class="hidden-gate-ring hidden-gate-ring-1"></div>
    <div class="hidden-gate-ring hidden-gate-ring-2"></div>
    <div class="hidden-gate-ring hidden-gate-ring-3"></div>
    <div class="hidden-gate-content">
      <span class="hidden-gate-glyph">${secret.icon}</span>
      <p class="hidden-gate-eyebrow">A Secret Awakens</p>
      <h3 class="hidden-gate-title">${secret.title}</h3>
      <p class="hidden-gate-text">${secret.revealText}</p>
      <p class="hidden-gate-subtext">${secret.revealSubtext}</p>
      <button type="button" class="btn oracle-btn-primary hidden-gate-close">Close the Gate <span class="btn-sparkle">&#10022;</span></button>
    </div>
  `;
  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";

  const particleLayer = overlay.querySelector(".hidden-gate-particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("span");
    p.className = "hidden-gate-particle";
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 2.5}s`;
    p.style.animationDuration = `${3 + Math.random() * 3}s`;
    particleLayer.appendChild(p);
  }

  requestAnimationFrame(() => overlay.classList.add("is-open"));

  const closeGate = () => {
    overlay.classList.remove("is-open");
    overlay.classList.add("is-closing");
    document.body.style.overflow = "";
    setTimeout(() => overlay.remove(), 600);
  };

  overlay.querySelector(".hidden-gate-close").addEventListener("click", closeGate);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeGate();
  });
  document.addEventListener("keydown", function escClose(e) {
    if (e.key === "Escape") {
      closeGate();
      document.removeEventListener("keydown", escClose);
    }
  });
}

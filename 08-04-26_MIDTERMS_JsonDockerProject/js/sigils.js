let SIGILS_DATA = null;
let sigilModalInstance = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    SIGILS_DATA = await loadJSON("data/sigils.json");
  } catch (err) {
    console.error("The Sigil Encyclopedia could not be reached:", err);
    return;
  }

  buildSigilGrid(SIGILS_DATA);
  wireSigilFilters(SIGILS_DATA);

  const modalEl = document.getElementById("sigilDetailModal");
  if (modalEl) sigilModalInstance = new bootstrap.Modal(modalEl);
});

function buildSigilGrid(sigils) {
  const grid = document.getElementById("sigilGrid");
  if (!grid) return;

  grid.innerHTML = "";

  sigils.forEach((sigil) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-4 col-xl-3 sigil-col";
    col.dataset.element = sigil.element;
    col.dataset.rarity = sigil.rarity;
    col.innerHTML = `
      <button type="button" class="sigil-card" data-sigil-id="${sigil.id}">
        <span class="sigil-rarity sigil-rarity-${sigil.rarity.toLowerCase()}">${sigil.rarity}</span>
        <img src="${sigil.image}" alt="${sigil.name}" class="sigil-img">
        <h3 class="sigil-name">${sigil.name}</h3>
        <span class="sigil-element">${elementGlyph(sigil.element)} ${sigil.element}</span>
      </button>
    `;
    grid.appendChild(col);
  });

  grid.querySelectorAll(".sigil-card").forEach((card) => {
    card.addEventListener("click", () => openSigilModal(card.dataset.sigilId));
  });
}

function elementGlyph(element) {
  const glyphs = { Fire: "\u{1F525}", Earth: "\u{1F33F}", Air: "\u{1F32C}\uFE0F", Water: "\u{1F4A7}" };
  return glyphs[element] || "\u2726";
}

function wireSigilFilters(sigils) {
  const elementSelect = document.getElementById("sigilElementFilter");
  const raritySelect = document.getElementById("sigilRarityFilter");
  const countEl = document.getElementById("sigilResultCount");
  if (!elementSelect || !raritySelect) return;

  const applyFilters = () => {
    const el = elementSelect.value;
    const rarity = raritySelect.value;
    let visible = 0;

    document.querySelectorAll(".sigil-col").forEach((col) => {
      const matchesElement = !el || col.dataset.element === el;
      const matchesRarity = !rarity || col.dataset.rarity === rarity;
      const show = matchesElement && matchesRarity;
      col.classList.toggle("d-none", !show);
      if (show) visible++;
    });

    if (countEl) {
      countEl.textContent = `${visible} sigil${visible === 1 ? "" : "s"} in the archive`;
    }
  };

  elementSelect.addEventListener("change", applyFilters);
  raritySelect.addEventListener("change", applyFilters);
  applyFilters();
}

function openSigilModal(sigilId) {
  const sigil = SIGILS_DATA.find((s) => s.id === sigilId);
  if (!sigil || !sigilModalInstance) return;

  document.getElementById("sigilModalImg").src = sigil.image;
  document.getElementById("sigilModalImg").alt = sigil.name;
  document.getElementById("sigilModalLabel").textContent = sigil.name;
  document.getElementById("sigilModalElement").textContent = sigil.element;
  document.getElementById("sigilModalRarity").textContent = sigil.rarity;
  document.getElementById("sigilModalRarity").className =
    `sigil-rarity sigil-rarity-${sigil.rarity.toLowerCase()}`;
  document.getElementById("sigilModalDescription").textContent = sigil.description;
  document.getElementById("sigilModalMeaning").textContent = sigil.meaning;
  document.getElementById("sigilModalBlessing").textContent = sigil.blessing;

  const monthLink = document.getElementById("sigilModalMonthLink");
  if (monthLink) {
    if (sigil.linkedMonth) {
      monthLink.classList.remove("d-none");
      monthLink.href = `destiny.html?month=${encodeURIComponent(sigil.linkedMonth)}`;
      monthLink.textContent = `See the ${sigil.linkedMonth} Reading \u2192`;
    } else {
      monthLink.classList.add("d-none");
    }
  }

  sigilModalInstance.show();
}

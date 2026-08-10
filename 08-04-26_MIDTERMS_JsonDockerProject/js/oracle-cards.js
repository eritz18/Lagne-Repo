let CARDS_DATA = null;

document.addEventListener("DOMContentLoaded", async () => {
  const spread = document.getElementById("cardSpread");
  if (!spread) return;

  try {
    CARDS_DATA = await loadJSON("data/cards.json");
  } catch (err) {
    console.error("The Oracle deck could not be shuffled:", err);
    return;
  }

  const singleBtn = document.getElementById("drawSingleBtn");
  const threeBtn = document.getElementById("drawThreeBtn");
  if (singleBtn) singleBtn.addEventListener("click", () => drawReading(1));
  if (threeBtn) threeBtn.addEventListener("click", () => drawReading(3));
});

function shuffleDeck(deck) {
  const copy = [...deck];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function drawReading(count) {
  const spread = document.getElementById("cardSpread");
  const results = document.getElementById("cardReadingResults");
  spread.innerHTML = "";
  results.innerHTML = "";

  const drawn = shuffleDeck(CARDS_DATA).slice(0, count);
  const labels = count === 3 ? ["Past", "Present", "Future"] : ["Your Card"];

  drawn.forEach((card, i) => {
    const wrap = document.createElement("div");
    wrap.className = "tarot-card-wrap";
    wrap.innerHTML = `
      <p class="tarot-position-label">${labels[i]}</p>
      <div class="tarot-card" tabindex="0" role="button" aria-label="Reveal ${labels[i]} card">
        <div class="tarot-card-inner">
          <div class="tarot-card-face tarot-card-back-face">
            <span class="tarot-card-glyph">&#10022;</span>
          </div>
          <div class="tarot-card-face tarot-card-front-face">
            <img src="${card.image}" alt="${card.name}" class="tarot-card-img" loading="lazy">
            <p class="tarot-card-name">${card.name}</p>
          </div>
        </div>
      </div>
      <p class="tarot-flip-hint">Tap to reveal</p>
    `;
    spread.appendChild(wrap);

    const tarotCard = wrap.querySelector(".tarot-card");
    const flip = () => {
      if (tarotCard.classList.contains("is-flipped")) return;
      tarotCard.classList.add("is-flipped");
      wrap.querySelector(".tarot-flip-hint").remove();
      spawnSparkles(wrap, 8);
      appendCardDetail(results, card, labels[i]);
    };
    tarotCard.addEventListener("click", flip);
    tarotCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
  });
}

function appendCardDetail(container, card, label) {
  const panel = document.createElement("div");
  panel.className = "result-card card-detail-panel";
  panel.innerHTML = `
    <div class="result-card-inner">
      <p class="result-eyebrow">${label} &middot; ${card.linkedMonth}</p>
      <div class="row align-items-center gy-3">
        <div class="col-sm-4 text-center">
          <img src="${card.image}" class="result-img" alt="${card.name}" loading="lazy">
        </div>
        <div class="col-sm-8">
          <h3 class="result-title gold-text">${card.name}</h3>
          <p class="result-traits">${card.element} &middot; ${card.sigil}</p>
          <p class="result-power-desc">${card.meaning}</p>
        </div>
      </div>
      <div class="result-details mt-3">
        <p style="color: var(--starlight); line-height: 1.7;">${card.description}</p>
      </div>
      <div class="result-lore mt-3">
        <h4>Message</h4>
        <p>${card.message}</p>
      </div>
      <div class="result-lore mt-3">
        <h4>Guidance</h4>
        <p>${card.guidance}</p>
      </div>
      <div class="result-lore mt-3">
        <h4>Warning</h4>
        <p>${card.warning}</p>
      </div>
    </div>
  `;
  container.appendChild(panel);
}

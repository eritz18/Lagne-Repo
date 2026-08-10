let DESTINY_DATA = null;
let DESTINY_FORTUNES = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    DESTINY_DATA = await loadJSON("data/months.json");
  } catch (err) {
    console.error("The Oracle's memory could not be reached:", err);
    return;
  }

  try {
    DESTINY_FORTUNES = await loadJSON("data/fortunes.json");
  } catch (err) {
    console.error("The Fortune Categories could not be reached:", err);
  }

  buildZodiacWheel();
  buildFortuneCategoryRow();

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("month");
  const requestedCategory = params.get(FORTUNE_CATEGORY_PARAM) || "";
  if (requested && DESTINY_DATA[requested]) {
    if (requestedCategory) activateFortuneChip(requestedCategory);
    revealDestinyInline(requested, requestedCategory);
  }
});

let wheelFortuneCategory = "";

function buildFortuneCategoryRow() {
  const wrap = document.getElementById("wheelFortuneChips");
  if (!wrap || !DESTINY_FORTUNES) return;

  DESTINY_FORTUNES.categories.forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fortune-chip";
    chip.dataset.category = cat.id;
    chip.innerHTML = `<span class="fortune-chip-icon">${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      const alreadyActive = chip.classList.contains("active");
      wrap.querySelectorAll(".fortune-chip").forEach((c) => c.classList.remove("active"));
      wheelFortuneCategory = alreadyActive ? "" : cat.id;
      if (!alreadyActive) chip.classList.add("active");

      const activeNode = document.querySelector(".wheel-node.active");
      if (activeNode) revealDestinyInline(activeNode.dataset.month, wheelFortuneCategory);
    });
    wrap.appendChild(chip);
  });
}

function activateFortuneChip(categoryId) {
  wheelFortuneCategory = categoryId;
  const wrap = document.getElementById("wheelFortuneChips");
  if (!wrap) return;
  const target = wrap.querySelector(`.fortune-chip[data-category="${categoryId}"]`);
  if (target) target.classList.add("active");
}

function buildZodiacWheel() {
  const svg = document.getElementById("zodiacWheel");
  if (!svg) return;
  const cx = 200, cy = 200, r = 150;
  const ns = "http://www.w3.org/2000/svg";

  MONTHS.forEach((month, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    const g = document.createElementNS(ns, "g");
    g.setAttribute("class", "wheel-node");
    g.setAttribute("data-month", month);
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", `Reveal the reading for ${month}`);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 16);

    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 3);
    text.textContent = month.slice(0, 3).toUpperCase();

    g.appendChild(circle);
    g.appendChild(text);
    svg.appendChild(g);

    const select = () => {
      document.querySelectorAll(".wheel-node").forEach((n) => n.classList.remove("active"));
      g.classList.add("active");
      revealDestinyInline(month, wheelFortuneCategory);
    };

    g.addEventListener("click", select);
    g.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(); }
    });
  });
}

window.revealDestinyInline = function revealDestinyInline(month, category) {
  const data = DESTINY_DATA[month];
  if (!data) return;

  setAura(data.aura);

  document.getElementById("resultPlaceholder").classList.add("d-none");
  const card = document.getElementById("resultCard");
  card.classList.remove("d-none");
  card.style.animation = "none";
  void card.offsetWidth;
  card.style.animation = "";

  document.getElementById("resultSign").textContent = `${month} \u00B7 ${data.sign}`;
  document.getElementById("resultCreature").textContent = data.creature;
  document.getElementById("resultTraits").innerHTML = data.traits
    .map((t) => `<span class="trait-badge">${t}</span>`)
    .join("");

  document.getElementById("resultCreatureImg").src = data.creatureImg;
  document.getElementById("resultCreatureImg").alt = `${data.creature}, mythological creature`;
  document.getElementById("resultSymbolImg").src = data.symbolImg;
  document.getElementById("resultSymbolImg").alt = `${data.symbol}, mystical symbol`;
  document.getElementById("resultSymbolLabel").textContent = data.symbol;

  document.getElementById("resultPower").textContent = data.power;
  document.getElementById("resultPowerDesc").textContent = data.powerDesc;
  document.getElementById("resultElement").textContent = data.element;
  document.getElementById("resultArtifact").textContent = data.artifact;
  document.getElementById("resultGuide").textContent = data.guide;
  document.getElementById("resultAlignment").textContent = data.alignment;
  document.getElementById("resultLuckyNumbers").textContent = data.luckyNumbers.join(", ");
  document.getElementById("resultLore").textContent = data.lore;

  const realmLink = document.getElementById("resultRealmLink");
  if (realmLink) realmLink.href = `order.html#${data.realm}`;

  renderFortunePanel(month, category);

  spawnSparkles(card, 16);

  const wheelNode = document.querySelector(`.wheel-node[data-month="${month}"]`);
  if (wheelNode) {
    document.querySelectorAll(".wheel-node").forEach((n) => n.classList.remove("active"));
    wheelNode.classList.add("active");
  }

  document.getElementById("discover").scrollIntoView({ behavior: "smooth", block: "start" });
};

function renderFortunePanel(month, category) {
  const panel = document.getElementById("resultFortunePanel");
  if (!panel) return;

  if (!category || !DESTINY_FORTUNES || !DESTINY_FORTUNES.fortunes[category]) {
    panel.classList.add("d-none");
    panel.innerHTML = "";
    return;
  }

  const catMeta = DESTINY_FORTUNES.categories.find((c) => c.id === category);
  const text = DESTINY_FORTUNES.fortunes[category][month];
  if (!catMeta || !text) {
    panel.classList.add("d-none");
    panel.innerHTML = "";
    return;
  }

  panel.classList.remove("d-none");
  panel.innerHTML = `
    <h4><span class="fortune-panel-icon">${catMeta.icon}</span> ${catMeta.label} Fortune</h4>
    <p>${text}</p>
  `;
}

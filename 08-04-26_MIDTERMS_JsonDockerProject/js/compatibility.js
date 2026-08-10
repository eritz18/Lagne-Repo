let COMPAT_MONTHS = null;
let COMPAT_RULES = null;
let selectedRelation = "friend";

const RELATION_OPTIONS = [
  { id: "partner", label: "Romantic Partner", icon: "\u{1F495}" },
  { id: "friend", label: "Friend", icon: "\u{1F91D}" },
  { id: "family", label: "Family Member", icon: "\u{1F3E1}" },
  { id: "other", label: "Someone Else", icon: "\u2726" },
];

const HARMONY_PAIRS = [["Air", "Fire"], ["Earth", "Water"]];
const BALANCED_PAIRS = [["Fire", "Earth"], ["Air", "Water"]];
const CHALLENGE_PAIRS = [["Fire", "Water"], ["Earth", "Air"]];

document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("revealCompatBtn");
  if (!btn) return;

  try {
    [COMPAT_MONTHS, COMPAT_RULES] = await Promise.all([
      loadJSON("data/months.json"),
      loadJSON("data/compatibility.json"),
    ]);
  } catch (err) {
    console.error("The Compatibility archive could not be reached:", err);
    return;
  }

  populateCompatSelects();
  buildRelationChips();
  btn.addEventListener("click", handleReveal);
});

function populateCompatSelects() {
  ["compatMonthA", "compatMonthB"].forEach((id) => {
    const select = document.getElementById(id);
    if (!select) return;
    MONTHS.forEach((month) => {
      const opt = document.createElement("option");
      opt.value = month;
      opt.textContent = `${month} — ${COMPAT_MONTHS[month].sign}`;
      select.appendChild(opt);
    });
  });
}

function buildRelationChips() {
  const wrap = document.getElementById("compatRelationChips");
  if (!wrap) return;

  RELATION_OPTIONS.forEach((rel, i) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fortune-chip" + (i === 1 ? " active" : "");
    chip.dataset.relation = rel.id;
    chip.innerHTML = `<span class="fortune-chip-icon">${rel.icon}</span> ${rel.label}`;
    chip.addEventListener("click", () => {
      wrap.querySelectorAll(".fortune-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      selectedRelation = rel.id;
    });
    wrap.appendChild(chip);
  });
}

function elementsPairMatch(pairs, a, b) {
  return pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}

function resolveCompatibilityRule(monthA, monthB) {
  if (monthA === monthB) return COMPAT_RULES.mirrorSouls;

  const elA = COMPAT_MONTHS[monthA].element;
  const elB = COMPAT_MONTHS[monthB].element;

  if (elA === elB) return COMPAT_RULES.kindredSpirits;
  if (elementsPairMatch(HARMONY_PAIRS, elA, elB)) return COMPAT_RULES.elementalHarmony;
  if (elementsPairMatch(BALANCED_PAIRS, elA, elB)) return COMPAT_RULES.balancedOpposites;
  if (elementsPairMatch(CHALLENGE_PAIRS, elA, elB)) return COMPAT_RULES.challengingConnection;
  return COMPAT_RULES.kindredSpirits;
}

function fillPlaceholders(text, monthA, monthB, dataA, dataB) {
  return text
    .replaceAll("{personA}", "Person A")
    .replaceAll("{personB}", "Person B")
    .replaceAll("{creatureA}", dataA.creature)
    .replaceAll("{creatureB}", dataB.creature)
    .replaceAll("{elementA}", dataA.element)
    .replaceAll("{elementB}", dataB.element);
}

function handleReveal() {
  const monthA = document.getElementById("compatMonthA").value;
  const monthB = document.getElementById("compatMonthB").value;
  const errorBox = document.getElementById("compatError");
  const resultEl = document.getElementById("compatResult");

  if (!monthA || !monthB) {
    errorBox.classList.remove("d-none");
    return;
  }
  errorBox.classList.add("d-none");

  const dataA = COMPAT_MONTHS[monthA];
  const dataB = COMPAT_MONTHS[monthB];
  const rule = resolveCompatibilityRule(monthA, monthB);

  const message = fillPlaceholders(rule.oracleMessage, monthA, monthB, dataA, dataB);
  const relationLabel = RELATION_OPTIONS.find((r) => r.id === selectedRelation).label;
  const relationNote = selectedRelation === "partner" ? rule.romanticNote : rule.friendshipNote;

  const sharedElement = dataA.element === dataB.element;

  resultEl.innerHTML = `
    <div class="result-card compat-result-card">
      <div class="result-card-inner">
        <p class="result-eyebrow">${relationLabel} Reading</p>
        <h3 class="result-title gold-text">${rule.type}</h3>
        <p class="result-traits">${monthA} (${dataA.creature}) &amp; ${monthB} (${dataB.creature})</p>

        <div class="row align-items-center gy-3 my-3">
          <div class="col-4 text-center">
            <img src="${dataA.creatureImg}" class="result-img" alt="${dataA.creature}" loading="lazy">
            <p class="img-caption">${monthA}</p>
          </div>
          <div class="col-4 text-center compat-vs-glyph">&#10022;</div>
          <div class="col-4 text-center">
            <img src="${dataB.creatureImg}" class="result-img" alt="${dataB.creature}" loading="lazy">
            <p class="img-caption">${monthB}</p>
          </div>
        </div>

        <div class="compat-score-row">
          <span class="detail-label">Compatibility Score</span>
          <div class="compat-score-bar"><div class="compat-score-fill" style="width:${rule.score}%;"></div></div>
          <span class="compat-score-value">${rule.score}%</span>
        </div>

        <div class="result-details mt-3">
          <div class="detail-row"><span class="detail-label">Shared / Complementary Elements</span><span class="detail-value">${dataA.element} ${sharedElement ? "(shared)" : "&amp; " + dataB.element}</span></div>
        </div>

        <div class="result-lore mt-3">
          <h4>Oracle Message</h4>
          <p>${message}</p>
        </div>

        <div class="compat-insight-row">
          <div class="compat-insight-card">
            <div class="result-lore">
              <h4>Strengths</h4>
              <p>${rule.strengths.join(" &middot; ")}</p>
            </div>
          </div>
          <div class="compat-insight-card">
            <div class="result-lore">
              <h4>Possible Conflicts</h4>
              <p>${rule.conflicts.join(" &middot; ")}</p>
            </div>
          </div>
        </div>

        <div class="result-lore mt-3">
          <h4>Communication Style</h4>
          <p>${rule.communicationStyle}</p>
        </div>

        <div class="result-lore mt-3">
          <h4>${selectedRelation === "partner" ? "Romantic Note" : "Friendship Note"}</h4>
          <p>${relationNote}</p>
        </div>
      </div>
    </div>
  `;

  setAura(dataA.aura);
  spawnSparkles(resultEl, 12);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [realms, months] = await Promise.all([
      loadJSON("data/realms.json"),
      loadJSON("data/months.json"),
    ]);
    buildRealmCards(realms, months);
  } catch (err) {
    console.error("The Celestial Order could not be reached:", err);
  }
});

function buildRealmCards(realms, months) {
  const grid = document.getElementById("realmGrid");
  if (!grid) return;

  realms.forEach((realm) => {
    const monthsInRealm = MONTHS.filter((m) => months[m].realm === realm.id);

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-6";
    col.innerHTML = `
      <div class="realm-card" id="${realm.id}">
        <span class="realm-icon">${realm.icon}</span>
        <h3>${realm.name}</h3>
        <p class="realm-tagline">${realm.tagline}</p>
        <p>${realm.description}</p>

        <div class="realm-meta">
          <span class="realm-meta-label">Governing Element</span>
          <p class="mb-3">${realm.element} &middot; ruled by ${realm.rulingForce}</p>

          <span class="realm-meta-label">Creatures of the Realm</span>
          <div class="realm-months">
            ${monthsInRealm
              .map((m) => `<span class="realm-month-pill">${m} &middot; ${months[m].creature}</span>`)
              .join("")}
          </div>

          <span class="realm-meta-label">Virtues</span>
          <div class="realm-months mb-3">
            ${realm.virtues.map((v) => `<span class="trait-badge">${v}</span>`).join("")}
          </div>

          <span class="realm-meta-label">Shadow Traits</span>
          <p class="mb-3">${realm.shadows.join(", ")}</p>

          <span class="realm-meta-label">Realm Practice</span>
          <p class="mb-3">${realm.practice}</p>

          <span class="realm-meta-label">Guardian Relic</span>
          <p class="realm-relic mb-0">${realm.guardianRelic}</p>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

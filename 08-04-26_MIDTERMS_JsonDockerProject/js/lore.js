document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [lore, months] = await Promise.all([
      loadJSON("data/lore.json"),
      loadJSON("data/months.json"),
    ]);
    buildLoreIntro(lore);
    buildLoreArticles(lore);
    buildChronicleGrid(months);
  } catch (err) {
    console.error("The Lore archive could not be reached:", err);
  }
});

function buildLoreIntro(lore) {
  const el = document.getElementById("loreIntro");
  if (el) el.textContent = lore.intro;
}

function buildLoreArticles(lore) {
  const wrap = document.getElementById("loreArticles");
  if (!wrap) return;

  lore.articles.forEach((article) => {
    const block = document.createElement("div");
    block.className = "lore-article";
    block.innerHTML = `
      <span class="lore-article-icon">${article.icon}</span>
      <h3>${article.title}</h3>
      ${article.body.map((p) => `<p>${p}</p>`).join("")}
    `;
    wrap.appendChild(block);
  });
}

function buildChronicleGrid(months) {
  const grid = document.getElementById("chronicleGrid");
  if (!grid) return;

  MONTHS.forEach((month) => {
    const data = months[month];
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="lore-card">
        <p class="lore-card-month">${month} &middot; ${data.sign}</p>
        <h3 class="lore-card-creature">${data.creature}</h3>
        <p class="lore-card-power">${data.power}</p>
        <span class="lore-card-element">${data.element}</span>
        <p class="mt-3 mb-0" style="color: var(--starlight-dim); font-size: .98rem;">${data.lore}</p>
      </div>
    `;
    grid.appendChild(col);
  });
}

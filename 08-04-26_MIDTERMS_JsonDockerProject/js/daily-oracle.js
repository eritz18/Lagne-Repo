document.addEventListener("DOMContentLoaded", async () => {
  const card = document.getElementById("dailyOracleCard");
  if (!card) return;

  try {
    const [months, fortunes, daily] = await Promise.all([
      loadJSON("data/months.json"),
      loadJSON("data/fortunes.json"),
      loadJSON("data/daily.json"),
    ]);
    buildDailyOracle(card, months, fortunes, daily);
  } catch (err) {
    console.error("The Daily Oracle could not be reached:", err);
    card.innerHTML = `<p class="placeholder-glyph">&#10022;</p><p>The Oracle is quiet today. Try returning shortly.</p>`;
  }
});

function hashDateString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function todaySeed() {
  const now = new Date();
  const dateKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  return { seed: hashDateString(dateKey), dateKey };
}

function buildDailyOracle(card, months, fortunes, daily) {
  const { seed, dateKey } = todaySeed();

  const monthName = MONTHS[seed % MONTHS.length];
  const monthData = months[monthName];

  const category = fortunes.categories[Math.floor(seed / 12) % fortunes.categories.length];
  const fortuneLine = fortunes.fortunes[category.id] ? fortunes.fortunes[category.id][monthName] : "";

  const affirmation = daily.affirmations[Math.floor(seed / 97) % daily.affirmations.length];
  const sacredNumber = monthData.luckyNumbers[seed % monthData.luckyNumbers.length];

  setAura(monthData.aura);

  card.innerHTML = `
    <div class="daily-oracle-inner">
      <p class="result-eyebrow">Today's Fragment &middot; ${formatFriendlyDate()}</p>
      <div class="row align-items-center gy-3">
        <div class="col-sm-4 text-center">
          <img src="${monthData.creatureImg}" alt="${monthData.creature}" class="result-img" loading="lazy">
        </div>
        <div class="col-sm-8">
          <h3 class="result-title gold-text">${monthData.creature}</h3>
          <p class="result-traits">${monthData.element} &middot; ${monthData.symbol}</p>
          <p class="result-power-desc">${monthData.powerDesc}</p>
        </div>
      </div>

      <div class="result-details mt-3">
        <div class="detail-row"><span class="detail-label">Fortune Category</span><span class="detail-value">${category.icon} ${category.label}</span></div>
        <div class="detail-row"><span class="detail-label">Sacred Number</span><span class="detail-value">${sacredNumber}</span></div>
      </div>

      ${fortuneLine ? `
      <div class="result-fortune-panel">
        <h4><span class="fortune-panel-icon">${category.icon}</span> Today's ${category.label} Whisper</h4>
        <p>${fortuneLine}</p>
      </div>` : ""}

      <div class="result-lore">
        <h4>Today's Affirmation</h4>
        <p>&ldquo;${affirmation}&rdquo;</p>
      </div>
    </div>
  `;

  spawnSparkles(card, 10);
}

function formatFriendlyDate() {
  const now = new Date();
  return now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
}

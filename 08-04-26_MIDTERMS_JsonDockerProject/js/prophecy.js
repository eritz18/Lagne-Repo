document.addEventListener("DOMContentLoaded", async () => {
  const btn = document.getElementById("revealProphecyBtn");
  if (!btn) return;

  let prophecyData = null;
  let monthsData = null;

  try {
    [prophecyData, monthsData] = await Promise.all([
      loadJSON("data/prophecies.json"),
      loadJSON("data/months.json"),
    ]);
  } catch (err) {
    console.error("The Prophecy archive could not be reached:", err);
    return;
  }

  btn.addEventListener("click", () => generateProphecy(prophecyData, monthsData));
});

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function capitalize(word) {
  return word ? word.charAt(0).toUpperCase() + word.slice(1) : word;
}

function fillTemplate(template, monthData) {
  return template
    .replaceAll("{creature}", monthData.creature)
    .replaceAll("{power}", monthData.power)
    .replaceAll("{sigil}", monthData.symbol)
    .replaceAll("{guide}", monthData.guide)
    .replaceAll("{element}", monthData.element)
    .replaceAll("{realmName}", capitalize(monthData.realm))
    .replaceAll("{alignment}", monthData.alignment);
}

function generateProphecy(prophecyData, monthsData) {
  const resultEl = document.getElementById("prophecyResult");
  resultEl.classList.remove("is-visible");
  resultEl.innerHTML = `
    <p class="placeholder-glyph">&#10022;</p>
    <p class="prophecy-loading">The Oracle is weaving your fragment of fate&hellip;</p>
  `;

  const monthName = pickRandom(MONTHS);
  const monthData = monthsData[monthName];

  setTimeout(() => {
    const opening = pickRandom(prophecyData.openings);
    const event = fillTemplate(pickRandom(prophecyData.celestialEvents), monthData);
    const destiny = pickRandom(prophecyData.destinyMessages);
    const warning = pickRandom(prophecyData.warnings);
    const guidance = fillTemplate(pickRandom(prophecyData.guidances), monthData);
    const ending = pickRandom(prophecyData.endings);

    const fullText = `${opening} ${event}, ${destiny}, ${warning}. ${guidance} ${ending}`;

    setAura(monthData.aura);

    resultEl.innerHTML = `
      <div class="prophecy-card">
        <p class="result-eyebrow">A Prophecy for You</p>
        <p class="prophecy-text">${fullText}</p>
      </div>
    `;
    spawnSparkles(resultEl, 14);
    resultEl.classList.add("is-visible");
  }, 900);
}

let ORACLE_MONTHS = null;
let ORACLE_FORTUNES = null;
let selectedFortuneCategory = "";

document.addEventListener("DOMContentLoaded", async () => {
  const modalEl = document.getElementById("birthMonthModal");
  if (!modalEl) return;

  try {
    ORACLE_MONTHS = await loadJSON("data/months.json");
  } catch (err) {
    console.error("The Oracle could not awaken:", err);
    return;
  }

  try {
    ORACLE_FORTUNES = await loadJSON("data/fortunes.json");
  } catch (err) {
    console.error("The Oracle's Fortune Categories could not be reached:", err);
  }

  populateMonthSelect();
  buildFortuneCategoryChips();
  wireModal();
  wireAutoOpen();
});

function buildFortuneCategoryChips() {
  const wrap = document.getElementById("fortuneCategoryChips");
  if (!wrap || !ORACLE_FORTUNES) return;

  wrap.innerHTML = "";
  selectedFortuneCategory = "";

  ORACLE_FORTUNES.categories.forEach((cat) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "fortune-chip";
    chip.dataset.category = cat.id;
    chip.innerHTML = `<span class="fortune-chip-icon">${cat.icon}</span> ${cat.label}`;
    chip.addEventListener("click", () => {
      const alreadyActive = chip.classList.contains("active");
      wrap.querySelectorAll(".fortune-chip").forEach((c) => c.classList.remove("active"));
      selectedFortuneCategory = alreadyActive ? "" : cat.id;
      if (!alreadyActive) chip.classList.add("active");
    });
    wrap.appendChild(chip);
  });
}

function populateMonthSelect() {
  const select = document.getElementById("monthSelect");
  if (!select) return;
  MONTHS.forEach((month) => {
    const opt = document.createElement("option");
    opt.value = month;
    opt.textContent = `${month} — ${ORACLE_MONTHS[month].sign}`;
    select.appendChild(opt);
  });
}

function wireModal() {
  const revealBtn = document.getElementById("revealBtn");
  const monthSelect = document.getElementById("monthSelect");
  const errorBox = document.getElementById("modalError");
  if (!revealBtn) return;

  revealBtn.addEventListener("click", () => {
    const chosen = monthSelect.value;

    if (!chosen || !ORACLE_MONTHS[chosen]) {
      if (errorBox) errorBox.classList.remove("d-none");
      monthSelect.classList.add("is-invalid");
      return;
    }

    if (errorBox) errorBox.classList.add("d-none");
    monthSelect.classList.remove("is-invalid");

    const modalInstance = bootstrap.Modal.getInstance(document.getElementById("birthMonthModal"));
    if (modalInstance) modalInstance.hide();

    monthSelect.value = "";

    goToDestiny(chosen, selectedFortuneCategory);
  });

  monthSelect.addEventListener("change", () => {
    monthSelect.classList.remove("is-invalid");
    if (errorBox) errorBox.classList.add("d-none");
  });
}

function goToDestiny(month, category) {
  if (typeof window.revealDestinyInline === "function") {
    window.revealDestinyInline(month, category);
  } else {
    let url = `destiny.html?month=${encodeURIComponent(month)}`;
    if (category) url += `&${FORTUNE_CATEGORY_PARAM}=${encodeURIComponent(category)}`;
    window.location.href = url;
  }
}
function wireAutoOpen() {
  if (!document.body.hasAttribute("data-auto-open-oracle")) return;
  const modalEl = document.getElementById("birthMonthModal");
  const modal = new bootstrap.Modal(modalEl);
  setTimeout(() => modal.show(), 1600);
}

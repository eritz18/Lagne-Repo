document.addEventListener("DOMContentLoaded", async () => {
  try {
    const categories = await loadJSON("data/faq.json");
    buildFaqAccordion(categories);
  } catch (err) {
    console.error("The Sacred FAQ could not be reached:", err);
  }
});

function buildFaqAccordion(categories) {
  const wrap = document.getElementById("faqWrap");
  if (!wrap) return;

  let itemCounter = 0;

  categories.forEach((category, catIndex) => {
    const title = document.createElement("h3");
    title.className = "faq-category-title";
    title.textContent = category.category;
    wrap.appendChild(title);

    const accordion = document.createElement("div");
    accordion.className = "accordion accordion-flush mystical-accordion";
    accordion.id = `faqAccordion${catIndex}`;

    category.items.forEach((item) => {
      itemCounter++;
      const id = `faqItem${itemCounter}`;
      const itemEl = document.createElement("div");
      itemEl.className = "accordion-item";
      itemEl.innerHTML = `
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}">
            ${item.q}
          </button>
        </h2>
        <div id="${id}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion${catIndex}">
          <div class="accordion-body">${item.a}</div>
        </div>
      `;
      accordion.appendChild(itemEl);
    });

    wrap.appendChild(accordion);
  });
}

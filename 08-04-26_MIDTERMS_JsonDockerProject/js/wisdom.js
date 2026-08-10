document.addEventListener("DOMContentLoaded", async () => {
  try {
    const wisdom = await loadJSON("data/wisdom.json");
    buildWisdomIntro(wisdom);
    buildWisdomNav(wisdom);
    buildWisdomChapters(wisdom);
  } catch (err) {
    console.error("The Temple of Wisdom could not be reached:", err);
  }
});

function buildWisdomIntro(wisdom) {
  const el = document.getElementById("wisdomIntro");
  if (el) el.textContent = wisdom.intro;
}

function buildWisdomNav(wisdom) {
  const nav = document.getElementById("wisdomChapterNav");
  if (!nav) return;

  wisdom.chapters.forEach((chapter) => {
    const link = document.createElement("a");
    link.href = `#${chapter.id}`;
    link.className = "wisdom-nav-pill";
    link.innerHTML = `<span>${chapter.icon}</span> ${chapter.navLabel || chapter.title}`;
    nav.appendChild(link);
  });
}

function buildWisdomChapters(wisdom) {
  const wrap = document.getElementById("wisdomChapters");
  if (!wrap) return;

  wisdom.chapters.forEach((chapter) => {
    const section = document.createElement("div");
    section.className = "wisdom-chapter";
    section.id = chapter.id;

    let bodyHtml = "";
    if (chapter.intro) {
      bodyHtml += `<p class="wisdom-chapter-lede">${chapter.intro}</p>`;
    }
    if (chapter.body) {
      bodyHtml += chapter.body.map((p) => `<p>${p}</p>`).join("");
    }
    if (chapter.steps) {
      bodyHtml += `<ol class="wisdom-steps">${chapter.steps
        .map(
          (step) => `
            <li>
              <span class="wisdom-step-title">${step.title}</span>
              <p>${step.description}</p>
            </li>`
        )
        .join("")}</ol>`;
    }
    if (chapter.linkHref) {
      bodyHtml += `<a href="${chapter.linkHref}" class="btn oracle-btn-ghost btn-sm mt-2">${chapter.linkText || "Learn more"} &rarr;</a>`;
    }

    section.innerHTML = `
      <span class="wisdom-chapter-icon">${chapter.icon}</span>
      <h2>${chapter.title}</h2>
      ${bodyHtml}
    `;
    wrap.appendChild(section);
  });
}

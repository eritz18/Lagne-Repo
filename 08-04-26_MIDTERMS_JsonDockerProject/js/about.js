async function loadAbout() {
    try {
        const response = await fetch('data/about.json');
        const data = await response.json();
        displayAbout(data);
    } catch (error) {
        console.error('Error loading about data:', error);
        document.getElementById('about-content').innerHTML =
            '<p class="empty-state">Could not load the About content. Please check that about.json exists.</p>';
    }
}

function displayAbout(data) {
    const container = document.getElementById('about-content');

    let sectionsHTML = '';
    data.sections.forEach(section => {
        sectionsHTML += `
            <section class="about-section">
                <h2>${section.heading}</h2>
                <p>${section.content}</p>
            </section>
        `;
    });

    const workflowHTML = `
        <section class="about-section workflow-section">
            <h2>How Paleontology Works</h2>
            <div class="workflow-badge" aria-label="JSON to website workflow">
                <span class="workflow-step">EXCAVATION</span>
                <span class="workflow-step">PREPARATION</span>
                <span class="workflow-step">INDENTIFICATION</span>
                <span class="workflow-step">DATING</span>
                <span class="workflow-step">RECONSTRUCTION</span>
            </div>
            <div class="workflow-copy">
                <p><strong>Excavation</strong> Carefully uncovering fossils from the ground.</p>
                <p><strong>Preparation</strong> Cleaning and preserving the fossil.</p>
                <p><strong>Identification</strong> Determining what the fossil belongs to.</p>
                <p><strong>Dating</strong> Estimating the fossil's age.</p>
                <p><strong>Reconstruction</strong> Using evidence to understand the ancient creature.</p>
            </div>
        </section>
    `;

    container.innerHTML = `
        <h1 class="page-title">${data.pageTitle}</h1>
        ${sectionsHTML}
        ${workflowHTML}
    `;
}

loadAbout();

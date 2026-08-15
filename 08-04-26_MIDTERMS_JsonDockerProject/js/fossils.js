async function loadFossils() {
    try {
        const response = await fetch('data/fossils.json');
        const fossils = await response.json();
        displayFossils(fossils);
    } catch (error) {
        console.error('Error loading fossils:', error);
        document.getElementById('fossil-container').innerHTML =
            '<p class="empty-state">Could not load the fossil records. Please check that fossils.json exists.</p>';
    }
}

function displayFossils(fossils) {
    const container = document.getElementById('fossil-container');
    container.innerHTML = '';

    fossils.forEach(fossil => {
        const card = document.createElement('article');
        card.className = 'fossil-card';

        card.innerHTML = `
            <div class="image-frame">
                <img src="${fossil.image}" alt="${fossil.name}" class="card-image" onerror="this.parentElement.classList.add('image-fallback'); this.remove()">
            </div>
            <div class="card-body">
                <span class="record-label">Discovery archive</span>
                <h3>${fossil.name}</h3>
                <p class="sci-name">${fossil.scientificName}</p>
                <div class="card-meta">
                    <p><strong>Dinosaur</strong>${fossil.dinosaur}</p>
                    <p><strong>Year discovered</strong>${fossil.yearDiscovered}</p>
                    <p><strong>Location</strong>${fossil.discoveryLocation}</p>
                    <p><strong>Country</strong>${fossil.country}</p>
                    <p><strong>Significance</strong>${fossil.significance}</p>
                </div>
                <p class="card-description">${fossil.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

loadFossils();

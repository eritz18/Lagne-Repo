let allDinosaurs = [];

async function loadDinosaurs() {
    try {
        const response = await fetch('data/dinosaurs.json');
        allDinosaurs = await response.json();
        displayDinosaurs(allDinosaurs);
        setupSearch();
    } catch (error) {
        console.error('Error loading dinosaurs:', error);
        document.getElementById('dinosaur-container').innerHTML =
            '<p class="empty-state">Could not load the dinosaur records. Please check that dinosaurs.json exists.</p>';
    }
}

function displayDinosaurs(dinosaurs) {
    const container = document.getElementById('dinosaur-container');
    container.innerHTML = '';

    if (dinosaurs.length === 0) {
        container.innerHTML =
            '<p class="empty-state">No specimens match that search. Try a different name, period, diet, or location.</p>';
        return;
    }

    dinosaurs.forEach(dino => {
        const card = document.createElement('article');
        card.className = 'dino-card';

        card.innerHTML = `
            <div class="image-frame">
                <img src="${dino.image}" alt="${dino.name}" class="card-image" onerror="this.parentElement.classList.add('image-fallback'); this.remove()">
            </div>
            <div class="card-body">
                <span class="record-label">Specimen record</span>
                <h3>${dino.name}</h3>
                <p class="sci-name">${dino.scientificName}</p>
                <div class="card-meta">
                    <p><strong>Period</strong>${dino.period}</p>
                    <p><strong>Diet</strong>${dino.diet}</p>
                    <p><strong>Location</strong>${dino.location}</p>
                    <p><strong>Length</strong>${dino.length}</p>
                    <p><strong>Weight</strong>${dino.weight}</p>
                </div>
                <p class="card-description">${dino.description}</p>
            </div>
        `;

        container.appendChild(card);
    });
}

function setupSearch() {
    const searchInput = document.getElementById('dinoSearch');
    const clearBtn = document.getElementById('clearSearchBtn');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filtered = allDinosaurs.filter(dino => {
            return dino.name.toLowerCase().includes(searchTerm) ||
                   dino.period.toLowerCase().includes(searchTerm) ||
                   dino.diet.toLowerCase().includes(searchTerm) ||
                   dino.location.toLowerCase().includes(searchTerm);
        });
        displayDinosaurs(filtered);
    });

    clearBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        displayDinosaurs(allDinosaurs);
    });
}

loadDinosaurs();

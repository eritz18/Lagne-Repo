async function loadTimeline() {
    try {
        const response = await fetch('data/timeline.json');
        const timelineData = await response.json();
        displayTimeline(timelineData);
    } catch (error) {
        console.error('Error loading timeline:', error);
        document.getElementById('timeline-container').innerHTML =
            '<p class="empty-state">Could not load the timeline records. Please check that timeline.json exists.</p>';
    }
}

function displayTimeline(timelineData) {
    const container = document.getElementById('timeline-container');
    container.innerHTML = '';

    timelineData.forEach(entry => {
        const entryDiv = document.createElement('article');
        entryDiv.className = 'timeline-entry';

        entryDiv.innerHTML = `
            <div class="timeline-text">
                <span class="record-label">Geological field note</span>
                <h3>${entry.title}</h3>
                <div class="timeline-meta">
                    <span class="period-tag">${entry.period}</span>
                    <span class="time-range">${entry.timeAgo}</span>
                    <span class="date-range">${entry.dateRange}</span>
                </div>
                <p class="description">${entry.description}</p>
                <div class="timeline-facts">
                    <p><strong>Major events</strong> ${entry.majorEvents}</p>
                    <p><strong>Notable dinosaurs</strong> ${entry.notableDinosaurs}</p>
                </div>
            </div>
            <div class="timeline-image">
                <div class="image-frame">
                    <img src="${entry.image}" alt="${entry.title}" class="card-image" onerror="this.parentElement.classList.add('image-fallback'); this.remove()">
                </div>
            </div>
        `;

        container.appendChild(entryDiv);
    });
}

loadTimeline();

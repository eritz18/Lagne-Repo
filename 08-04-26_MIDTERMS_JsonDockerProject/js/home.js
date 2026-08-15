async function loadHomeData() {
    try {
        const response = await fetch('data/home.json');
        const data = await response.json();

        displayHomeData(data);
    } catch (error) {
        console.error('Error loading home data:', error);
        document.getElementById('home-content').innerHTML =
            '<p class="empty-state">Could not load the home content. Please check that home.json exists.</p>';
    }
}

function displayHomeData(data) {
    const container = document.getElementById('home-content');

    container.innerHTML = `
        <section class="hero-section">
            <div class="hero-text">
                <span class="hero-kicker">Expedition brief / ancient Earth</span>
                <h1>${data.heroTitle}</h1>
                <p class="subhead">${data.heroSubtitle}</p>
                <p>${data.introduction}</p>
                <div class="stat-list">
                    <span class="stat-badge">Featured: ${data.featuredDinosaur}</span>
                    <span class="stat-badge">${data.featuredFact}</span>
                    <span class="stat-badge">${data.prehistoricStat}</span>
                </div>
                <a class="hero-cta" href="dinosaurs.html">Explore the species archive</a>
                <p class="expedition-note"><em>${data.expeditionMessage}</em></p>
            </div>
            <div class="hero-image">
                <div class="image-frame">
                    <img src="${data.heroImage}" alt="${data.featuredDinosaur} illustration" class="card-image" onerror="this.parentElement.classList.add('image-fallback'); this.remove()">
                </div>
            </div>
        </section>

        <section class="about-section news-section">
            <h2>Latest Discoveries &amp; Research</h2>
            <p class="news-intro">Fresh dispatches from the field: new fossils, published studies, and expedition notes from the world of paleontology.</p>
            <div class="news-grid" id="news-grid"></div>
        </section>
    `;

    loadNewsData();
}

async function loadNewsData() {
    try {
        const response = await fetch('data/news.json');
        const news = await response.json();

        displayNewsData(news);
    } catch (error) {
        console.error('Error loading news data:', error);
        const newsGrid = document.getElementById('news-grid');
        if (newsGrid) {
            newsGrid.innerHTML =
                '<p class="empty-state">Could not load the latest discoveries. Please check that news.json exists.</p>';
        }
    }
}

function displayNewsData(news) {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;

    newsGrid.innerHTML = '';

    news.forEach(article => {
        const card = document.createElement('article');
        card.className = 'news-card';

        card.innerHTML = `
            <div class="image-frame">
                <img src="${article.image}" alt="${article.title}" class="card-image" onerror="this.parentElement.classList.add('image-fallback'); this.remove()">
            </div>
            <div class="card-body">
                <span class="record-label">${article.category}</span>
                <h3>${article.title}</h3>
                <span class="news-date">${article.date}</span>
                <p class="card-description">${article.description}</p>
                <a class="news-readmore" href="${article.readMoreUrl}" target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
        `;

        newsGrid.appendChild(card);
    });
}

loadHomeData();

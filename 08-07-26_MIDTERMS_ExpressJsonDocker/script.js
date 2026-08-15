document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');
  const countDisplay = document.getElementById('game-count');

  fetch('/api/games')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(games => {
      countDisplay.textContent = `🕹️ ${games.length} games in collection`;

      container.innerHTML = games.map(game => {
        const hasImage = game.image && game.image.trim() !== '';
        
        return `
          <div class="game-card">
            <div class="game-header">
              ${hasImage ? `
                <img src="${game.image}" alt="${game.name}" class="game-image" 
                     onerror="this.style.display='none'; this.parentElement.querySelector('.game-image-placeholder').style.display='flex';">
                <div class="game-image-placeholder" style="display:none;">🎮</div>
              ` : `
                <div class="game-image-placeholder">🎮</div>
              `}
              <div class="game-title">
                <h3>${game.name}</h3>
                <span class="year-badge">${game.year || 'N/A'}</span>
              </div>
            </div>
            
            <div class="game-details">
              <span class="game-genre">${game.genre || 'Unknown Genre'}</span>
              <span class="game-platform">${game.platform || 'Unknown Platform'}</span>
            </div>
            
            <div class="game-description">
              ${game.description || 'No description available.'}
            </div>
          </div>
        `;
      }).join('');
    })
    .catch(error => {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:3rem; background:#141b24; border:2px solid #ff6b6b; border-radius:16px;">
          <h3 style="color:#ff6b6b;">⚠️ Could not load game collection</h3>
          <p style="color:#8fa0b8; margin-top:0.5rem;">Make sure the server is running and try again.</p>
          <p style="color:#5a6a7a; font-size:0.85rem; margin-top:0.5rem;">Error: ${error.message}</p>
        </div>
      `;
      countDisplay.textContent = '❌ Failed to load games';
      console.error('Fetch error:', error);
    });
});
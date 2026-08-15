const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname)));

app.get('/api/games', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'games.json'), 'utf8');
    const games = JSON.parse(data);
    res.json(games);
  } catch (error) {
    console.error('Error reading games.json:', error);
    res.status(500).json({ error: 'Unable to load game data' });
  }
});

app.listen(PORT, () => {
  console.log(`🎮 Game Codex server running at http://localhost:${PORT}`);
  console.log(` /api/games serves data from games.json`);
});
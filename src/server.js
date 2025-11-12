const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/crimes', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../json/crimes.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    res.json(json.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar crimes: ' + err.message });
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

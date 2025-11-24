const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const publicPath = path.join(__dirname, 'public');
const jsonPath = path.join(__dirname, 'json', 'crimes.json');

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'crimes.html'));
});

app.get('/api/crimes', async (req, res) => {
  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    const json = JSON.parse(data);
    res.json(json.data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao carregar crimes: ' + err.message });
  }
})
app.listen(PORT, () => console.log(`Servidor rodando em: http://localhost:${PORT}`));
/*adicionar um thortle aqui e um verificar de forwaded e csp
*/

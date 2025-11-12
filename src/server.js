const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/crimes', async (req, res) => {
  try {


    const ocorrenciasResp = (await fetch('crimes'));

    if (!ocorrenciasResp.ok) {
      const txt = await ocorrenciasResp.text();
      throw new Error('Erro ao buscar ocorrências: ' + txt);
    }

    const ocorrencias = await ocorrenciasResp.json();
    res.json(ocorrencias.data || []);
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

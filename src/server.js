const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/api/crimes', async (req, res) => {
  try {
<<<<<<< HEAD


    const ocorrenciasResp = (await fetch('crimes'));
=======
    const loginResp = await fetch('https://api-service.fogocruzado.org.br/api/v2/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: "youmail@gmail.com",
        password: "password"
      })
    });

    if (!loginResp.ok) {
      const txt = await loginResp.text();
      throw new Error('Falha no login: ' + txt);
    }

    const dadosLogin = await loginResp.json();
    const token = dadosLogin.access_token;

    const ocorrenciasResp = await fetch('https://api-service.fogocruzado.org.br/api/v2/occurrences?take=200', {
      headers: { Authorization: `Bearer ${token}` }
    });
>>>>>>> origin/main

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

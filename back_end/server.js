const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); // <--- habilita CORS para qualquer origem
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '987123',
  database: 'sistema_gerenciamento'
});

app.post('/cadastro', (req, res) => {
  const { nome_completo,nome_social, email, senha } = req.body;
  const sql = "INSERT INTO cadastro (nome_completo,nome_social, email, senha) VALUES (?, ?, ?, ?)";
  db.query(sql, [nome_completo,nome_social, email, senha], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send("Cadastro inserido com sucesso! ID: " + result.insertId);
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

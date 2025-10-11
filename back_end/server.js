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

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  const sql = "SELECT nome_completo FROM cadastro WHERE email = ? AND senha = ?";
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro no servidor" });
    }

    if (results.length > 0) {
      res.json({ message: "Bem-vindo, " + results[0].nome_completo + "!" });

    } else {
      res.status(401).json({ error: "Email ou senha inválidos" });
    }
  });
  // console.log("Recebido:", email, senha);
  // console.log("Resultados da query:", results);

});

app.post('/estoqueEntrada', (req, res) =>{
  const {idProduto, quantity, location, responsible, dataEntrada} = req.body;
  const sql = "INSERT INTO estoque_entrada (produto_id, quantidade, data_entrada, fornecedor, observacao, localizacao) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [idProduto, quantity, dataEntrada, ])

})

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});

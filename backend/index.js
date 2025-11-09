// Importação dos módulos necessários
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

// Inicializa a aplicação Express
const app = express();

// Define a porta do servidor
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Conecta (ou cria) o banco de dados SQLite
const db = new sqlite3.Database('./bancodedados.db', (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("✅ Conectado ao banco de dados SQLite.");

    // Cria a tabela 'Personagens' se ela ainda não existir
    db.run(`
      CREATE TABLE IF NOT EXISTS Personagens (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        raca TEXT NOT NULL,
        habilidades TEXT NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error("Erro ao criar tabela:", err.message);
      } else {
        console.log("✅ Tabela 'Personagens' verificada/criada com sucesso.");
      }
    });
  }
});

// --------------------- ROTAS DA API ----------------------

// 📜 LISTAR todos os personagens (GET)
app.get('/personagens', (req, res) => {
  db.all('SELECT * FROM Personagens ORDER BY nome', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Erro ao buscar personagens: " + err.message });
      return;
    }
    res.json(rows);
  });
});

// ➕ CADASTRAR um novo personagem (POST)
app.post('/personagens', (req, res) => {
  const { nome, raca, habilidades } = req.body;

  if (!nome || !raca || !habilidades) {
    return res.status(400).json({ error: 'Campos nome, raça e habilidades são obrigatórios.' });
  }

  const sql = 'INSERT INTO Personagens (nome, raca, habilidades) VALUES (?, ?, ?)';
  db.run(sql, [nome, raca, JSON.stringify(habilidades)], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao cadastrar personagem: " + err.message });
    }
    res.status(201).json({ id: this.lastID, nome, raca, habilidades });
  });
});

// ❌ DELETAR um personagem pelo ID (DELETE)
app.delete('/personagens/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM Personagens WHERE id = ?';

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao deletar personagem: " + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Personagem não encontrado.' });
    }
    res.json({ message: 'Personagem removido com sucesso!' });
  });
});

// ✏️ ATUALIZAR personagem (opcional)
app.put('/personagens/:id', (req, res) => {
  const { id } = req.params;
  const { nome, raca, habilidades } = req.body;

  let fields = [];
  let values = [];

  if (nome) { fields.push("nome = ?"); values.push(nome); }
  if (raca) { fields.push("raca = ?"); values.push(raca); }
  if (habilidades) { fields.push("habilidades = ?"); values.push(JSON.stringify(habilidades)); }

  if (fields.length === 0) {
    return res.status(400).json({ error: "Nenhum campo para atualizar." });
  }

  values.push(id);

  const sql = `UPDATE Personagens SET ${fields.join(', ')} WHERE id = ?`;
  db.run(sql, values, function (err) {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar personagem: " + err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Personagem não encontrado." });
    }
    res.json({ message: "Personagem atualizado com sucesso!" });
  });
});

// 🚀 Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});

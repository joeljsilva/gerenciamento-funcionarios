const express = require('express');
const router = express.Router();
const pool = require('../db/conn');

// Pegando os dados
router.get("/cadastrar", (req, res) => {
  const title = "Cadastrar funcionário";
  res.render("cadastrar", { title });
});
router.post("/cadastrarusuario", (req, res) => {
  const nome = req.body.nome;
  const nascimento = req.body.nascimento;
  const setor = req.body.setor;
  const registro = req.body.registro;
  const sql = "INSERT INTO funcionarios (??, ??, ??, ??) VALUES (?, ?, ?, ?)";
  const data = ['nome', 'nascimento', 'setor', 'numero_registro', nome, nascimento, setor, registro]
  pool.query(sql, data, (err) => {
    if (err) {
      return console.log(err);
    }
    res.redirect("funcionarios");
  });
});

// Mostrando os dados
router.get("/funcionarios", (req, res) => {
  const title = "Funcionários";
  const sql = "SELECT *, DATE_FORMAT(nascimento, '%d/%m/%Y') AS convertDate FROM funcionarios";
  
  pool.query(sql, (err, data) => {
    if (err) {
      return console.log(err);
    }
    const funcionarios = data;
    res.render("funcionarios", { funcionarios, title });
  });
});

// Mostrar perfil por ID
router.get("/funcionarios/:id", (req, res) => {
  const title = "Perfil Funcionário";
  const id = req.params.id;
  const sql = "SELECT *, DATE_FORMAT(nascimento, '%d/%m/%Y') AS convertDate FROM funcionarios WHERE ?? = ?";
  const data = ['id', id]
  pool.query(sql, data, (err, data) => {
    if (err) {
      return console.log(err);
    }
    const funcionario = data[0];
    res.render("funcionario", { funcionario, title });
  });
});

// Editar perfil - Pegar os dados
router.get('/editar/:id', (req, res) => {
  const title = 'Editar Funcionário'
  const id = req.params.id;
  const sql = "SELECT *, DATE_FORMAT(nascimento, '%d/%m/%Y') AS convertDate FROM funcionarios WHERE ?? = ?"
  const data = ['id', id]
  pool.query(sql, data, (err, data) => {
    if(err) {
      return console.log(err)
    }
    const funcionario = data[0];
    res.render('editarfuncionario', {funcionario, title})
  })
})

// Editar perfil - Update dados
router.post('/atualizardados', (req, res) => {
  const id = req.body.id;
  const nome = req.body.nome;
  const nascimento = req.body.nascimento;
  const setor = req.body.setor;
  const registro = req.body.registro;
  const sql = "UPDATE funcionarios SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;"
  const data = ['nome', nome, 'nascimento', nascimento, 'setor', setor, 'numero_registro', registro, 'id', id]
  pool.query(sql, data, (err) => {
    if (err) {
      return console.log(err)
    }
    res.redirect('funcionarios')
  })
})

// Deletar perfil
router.post('/deletar/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM funcionarios WHERE ?? = ?;"
  const data = ['id', id]
  pool.query(sql, data, (err) => {
    if(err) {
      return console.log(err)
    }
    res.redirect('/')
  })
})

module.exports = router;
const express = require("express");
const app = express();
const exphdb = require("express-handlebars");
const pool = require("./db/conn");
const iempresa = require('./router/router')

// Ler arquivos vindo da requisção no body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Pasta estatica para arquivos css, imgs etc
app.use(express.static("public"));

// Configuração handlebars
app.engine("handlebars", exphdb.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  const title = "iEmpresa";
  res.render("home", { title });
});

// Aplicação iEmpresa
app.use('/iempresa', iempresa)

// Servidor rodando
app.listen(3000);

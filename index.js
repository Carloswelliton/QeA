const express = require("express"); //importando o express
const app = express(); //carregando o express
const bodyParser = require("body-parser"); //importando o Body-parser
const connection = require("./database/database"); // importando a conexao do BD
const Pergunta = require("./database/Pergunta"); //importando o Model das perguntas
const Resposta = require("./database/Resposta"); //importando o Model das respostas



//database
connection //estabelecando a conexão com o banco de daodos MySQL
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o BD")
  })
  .catch((msgErro) => {
    console.log(msgErro, "Deu erro");
  })


//Configurações
app.set("view engine", "ejs"); //configurando o EJS (sempre chamar antes das rotas)
app.use(express.static("public")); // Configurando o express para usar os arquivos css
app.use(bodyParser.urlencoded({extended: false})); //configurando o body-parser para receber parametros no backend dos formulários do metodo POST
app.use(bodyParser.json()); //configurando a leitura de dados de formulários enviados via Json (comum com api)


//rotas
app.get("/", (req, res) => {    //exibibindo váriaveis com o EJS (definimos algumas aqui, e depois passamos para o EJS)
  Pergunta.findAll({raw: true, order: [
    ["id", "desc"]
  ]}).then(perguntas => {
    res.render("index", {
      perguntas: perguntas
    });
  })
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  Pergunta.create({
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if(pergunta != undefined){
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [["id", "desc"]]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
      });
     
      });
    }else{
      res.redirect("/");
    }
  });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/"+perguntaId)
  })
});

//Porta do servidor
app.listen(8080, () => {console.log("app rodando");});
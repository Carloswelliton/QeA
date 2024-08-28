'use strict';

import express from "express";
const app = express();
import bodyParser from "body-parser";
import connection from "./database/Database.js";
import Pergunta from "./database/Pergunta.js";
import Resposta from "./database/Resposta.js"


//Database
connection.authenticate().then(()=>{
    console.log("BD connection sucefull");
}).catch((msgErro)=>{
    console.error(msgErro)
});

//configurando a view engine para paginas html
app.set('view engine', 'ejs');
app.use(express.static('public'));

//configurando o body-parser
/**app.use(bodyParser.urlencoded({extended: false})); permite que o usiuário envie os dados e o bodyparser
traduz em linguagem JS  **/
app.use(bodyParser.urlencoded({extended: false}));

//Lê dados de usuário enviados via JSON
app.use(bodyParser.json());

//rotas
app.get("/", (req, res)=>{
    //Chamando o módulo pertgunta e o .findAll busca todas os campos criado na tabela pergunta
    //raw: true, chama apenas os campos passados no módulo
    Pergunta.findAll({raw: true, order:[
        ['id', 'desc']
        //se achar as perguntas vai me retornar elas mesmas
    ]}).then(perguntas=>{
        res.render('index',{
            //a variavel que será mostrada "pergunta" recebe o conteudo de pergunta dentro do BD
            perguntas: perguntas
        });
    })
    
})

app.get("/perguntar", (req, res)=>{
    res.render("perguntar");
})

app.post("/salvarpergunta", (req,res)=>{
    let title = req.body.title;
    let description = req.body.description;
    Pergunta.create({
        title: title,
        description: description
    }).then(()=>{
        res.redirect("/");
    })
})

app.get('/pergunta/:id', (req, res)=>{
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){

           
            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[['id','DESC']]
            }).then(respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                });
            })         
        }else{
            res.redirect('/');
        }
    })
})

app.post('/responder', (req, res) => {
    let corpo =  req.body.corpo;
    let perguntaId = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect('/pergunta/'+perguntaId);
    });
})

app.listen(8080, ()=>{console.log("Running Server!");});
'use strict';

import express from 'express';
const app = express();
import bodyParser from 'body-parser';

app.set('view engine', 'esj');
app.use(express.static('public', ))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send("testei e funcionou")
})



app.listen(9090, ()=>{console.log("Servidor está rodando!")});

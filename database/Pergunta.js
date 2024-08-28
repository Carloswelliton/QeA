import Sequelize from 'sequelize';
import connection from "./Database.js";

const Pergunta = connection.define('perguntas',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false

    }
});

Pergunta.sync({force: false}).then(()=>{
    console.log("table created!");
})

export default Pergunta;
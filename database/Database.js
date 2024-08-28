import Sequelize from 'sequelize';

//função que conecta ao my sql, passando o nome do BD, o usuário e a senha, e via JSON informando onde está o servidor 
//e qual o tipo do BD que iremos usar
const connection = new Sequelize('guiaperguntas', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

export default connection;
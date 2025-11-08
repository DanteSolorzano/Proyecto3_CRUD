import { Sequelize } from 'sequelize-typescript'

const db = new Sequelize('sakila', 'root', 'rootroot', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // desactiva logs de SQL
    models: [__dirname + '/../models/**/*.ts']
  });
  
  export default db;

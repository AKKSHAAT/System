import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  {
    dialect: 'postgres',
    host: 'localhost',
    username: 'root',
    password: '12345',
    database:  'test',
    port: 5432,
    logging: false, 
  }
);

export default sequelize
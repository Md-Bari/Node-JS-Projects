const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'auth_db';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

let isConnected = false;

const connectDB = async () => {
  try {
    // 1. Automatically create database if it doesn't exist
    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await connection.end();

    // 2. Authenticate Sequelize with the database
    await sequelize.authenticate();
    console.log(`✅ MySQL Connected successfully to database: ${DB_NAME}`);

    // 3. Synchronize models with database tables
    await sequelize.sync();
    console.log(`✅ MySQL tables synced successfully`);
    isConnected = true;
  } catch (error) {
    isConnected = false;
    console.error(`❌ MySQL Connection Error: ${error.message}`);
    console.error('💡 Please verify that your MySQL server is running (e.g. via XAMPP, WAMP, or MySQL service) and credentials in .env are correct.');
  }
};

module.exports = { sequelize, connectDB, isConnected: () => isConnected };

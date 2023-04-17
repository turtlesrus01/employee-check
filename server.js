//import modules (express, mysql2, inquirer)
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv')
dotenv.config();

const app = express();

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//database connection (mysql)
const db = mysql.createConnection(
  {
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PW,
  database: 'employees_db'
  },
  console.log('Connected to the employees_db database.')
  );

//inquirer start, ask user how to start
//create a new employee function (post)

//read the database and view employees, roles, and departments (get)
//delete an employee from database (delete)
//update info for an employee (update)
//view employee by manager (get)

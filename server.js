//import modules (express, mysql2, inquirer)
const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;

const app = express();

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//database connection (mysql)

//inquirer start, ask user how to start
//create a new employee function (post)

//read the database and view employees, roles, and departments (get)
//delete an employee from database (delete)
//update info for an employee (update)
//view employee by manager (get)

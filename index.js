//import modules (express, mysql2, inquirer)
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const dotenv = require("dotenv");
const { default: inquirer } = require("inquirer");
dotenv.config();

const app = express();

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//database connection (mysql)
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: process.env.DB_PW,
    database: "employees_db",
  },
  console.log("Connected to the employees_db database.")
);

//inquirer start, ask user how to start

function start () {
  inquirer
  .prompt([
    {
      type: "list",
      name: "task",
      message: "What would you like to do?",
      choices: [
        "Create a new employee",
        "View employees, roles, and departments",
        "Delete an employee",
        "Update employee information",
        "View employees by manager",
        "Exit",
      ],
    },
  ])
  .then((answer) => {
    switch (answer.task) {
      case "Create a new employee":
        createEmployee();
        break;
      case "View employees, roles, and departments":
        viewData();
        break;
      case "Delete an employee":
        deleteEmployee();
        break;
      case "Update employee information":
        updateEmployee();
        break;
      case "View employees by manager":
        viewByManager();
        break;
      case "Exit":
        console.log("Goodbye!");
        process.exit();
    }
  });
}
  
//create a new employee function (post)
function createEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter employee first name:',
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter employee last name:',
    },
    {
      type: 'input',
      name: 'roleId',
      message: 'Enter employee role id:',
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Enter employee department id:',
    },
  ]).then((answer) => {
    switch (answer.action) {
      case "View all employees":
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          res.json({
            message: 'success',
            data: rows
          });
        });
        break;
      case "Create a new employee":
        createEmployee();
        break;

    }
  })

};

//read the database and view employees, roles, and departments (get)
function createEmployee() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What would you like to view?',
      choices: [
        'View all employees',
        'View all roles',
        'View all departments',
        'View employees by department',
        'View employees by manager'
      ]
    }
  ]).then((answer) => {
    switch (answer.action) {
      case "View all employees":
        const sql = `SELECT * FROM employees`;
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
          res.json({
            message: 'success',
            data: rows
          });
        });
        break;
      case "Create a new employee":
        createEmployee();
        break;

    }
  })

};
//delete an employee from database (delete)
//update info for an employee (update)
//view employee by manager (get)

//import modules (express, mysql2, inquirer)
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
require('dotenv').config();
console.log(process.env.DB_PW)
const inquirer = require('inquirer');

const app = express();

//express middleware (urlencoded/url parser, json parser)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//database connection (mysql)
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: `${process.env.DB_PW}`,
    database: "employees_db",
  },
  console.log("Connected to the employees_db database.")
);

//inquirer start, ask user how to start

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.task) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's role":
          updateEmployeeRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "View employees by manager":
          viewEmployeesByManager();
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit();
        default:
          console.log(`Invalid action: ${answer.task}`);
          start();
          break;
      }
    })
    .catch((error) => {
      console.error(error);
      process.exit();
    });
}

//create a new employee function (post)
function createEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter employee first name:",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter employee last name:",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter employee role id:",
      },
      {
        type: "input",
        name: "departmentId",
        message: "Enter employee department id:",
      },
      {
        type: "confirm",
        name: "isManager",
        message: "Is the employee a manager?",
        default: false,
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, department_id, manager_id) VALUES (?, ?, ?, ?, ?)`;
      db.query(
        sql,
        [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
        (err, rows) => {
          if (err) {
            console.log(err);
            return;
          } else {
            console.log(
              `Employee ${answer.firstName} ${answer.lastName} created`
            );
            console.table(rows);
            start();
          }
        }
      );
    });
}

//read the database and view employees, roles, and departments (get)
function viewData() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to view?",
        choices: [
          "View all employees",
          "View all roles",
          "View all departments",
          "View employees by department",
          "View employees by manager",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.action) {
        case "View all employees":
          const sql = `SELECT * FROM employees`;
          db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            res.json({
              message: "success",
              data: rows,
            });
          });
          break;
        case "Create a new employee":
          createEmployee();
          break;
      }
    });
}
//delete an employee from database (delete)
//update info for an employee (update)
//view employee by manager (get)

//call the first prompt
start();
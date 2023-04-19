//import modules (express, mysql2, inquirer)
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
require("dotenv").config();
const inquirer = require("inquirer");

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
          'View employees by manager',
          'View employees by department',
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
        case 'View employees by department':
          viewEmployeesByDepartment();
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
function addEmployee() {
  //db connect for populate role list
  const roleQuery = "SELECT id, title FROM role";
  db.query(roleQuery, (err, roles) => {
    if (err) {
      console.error(err);
      return;
    }
    //convert roles to array
    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    //db connect for populate role list
    const managerQuery = "SELECT id, name FROM manager";
    db.query(managerQuery, (err, managers) => {
      if (err) {
        console.error(err);
        return;
      }
      //convert managers to array
      const managerChoices = managers.map((manager) => ({
        name: manager.name,
        value: manager.id,
      }));

      //new employee prompt
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          console.table(answer);
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
          db.query(
            sql,
            [
              answer.firstName,
              answer.lastName,
              answer.roleId,
              answer.managerId,
            ],
            (err, rows) => {
              if (err) {
                console.error(err);
                return;
              } else {
                console.log(
                  `Added ${answer.firstName} ${answer.lastName} to the database`
                );
                start();
              }
            }
          );
        });
    });
  });
}

//function that dispays all employee data
function viewEmployees() {
  const eView = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name , role.salary, manager.name
  FROM employee 
  INNER JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON role.department_id = department.id
  LEFT JOIN manager
    ON employee.manager_id = manager.id`;
  db.query(eView, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    start();
  });
}
//function that displays departments
function viewDepartments() {
  const dView = `SELECT * FROM department`;
  db.query(dView, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    start();
  });
}
//function that dispays all role data
function viewRoles() {
  const rView = `SELECT * FROM role`;
  db.query(rView, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    start();
  });
}
//function that dispays all employee data sorted by manager
function viewEmployeesByManager(){
  const edView = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name , role.salary, manager.name
  FROM employee 
  INNER JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON role.department_id = department.id
  LEFT JOIN manager
    ON employee.manager_id = manager.id
  ORDER BY manager.name`;
  db.query(edView, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    start();
  });
};
//function that dispays all employee data sorted by department
function viewEmployeesByDepartment() {
  const edView = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name , role.salary, manager.name
  FROM employee 
  INNER JOIN role
    ON employee.role_id = role.id
  LEFT JOIN department
    ON role.department_id = department.id
  LEFT JOIN manager
    ON employee.manager_id = manager.id
  ORDER BY department.name`;
  db.query(edView, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    console.table(rows);
    start();
  });
}

//delete an employee from database (delete)
//update info for an employee (update)
//view employee by manager (get)

//call the first prompt
start();

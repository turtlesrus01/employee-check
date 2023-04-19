/*managers*/
INSERT INTO manager (name) VALUES ('Juan Doe');
INSERT INTO manager (name) VALUES ('Juanita Cruz');
INSERT INTO manager (name) VALUES ('Edward Martinez');
INSERT INTO manager (name) VALUES ('Walter White');

/*departments*/
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Engineering');

/*roles*/
INSERT INTO role (title_id, salary, department_id) VALUES ('Sales Executive', 50000, 1);
INSERT INTO role (title_id, salary, department_id) VALUES ('Marketing Manager', 60000, 2);
INSERT INTO role (title_id, salary, department_id) VALUES ('Software Engineer', 80000, 3);

/*employees*/
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('Jesse', 'Pinkman', 4, 3);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('Alice', 'Lee', 2, 2);
INSERT INTO employees (first_name, last_name, manager_id, role_id) VALUES ('David', 'Wang', 1, 3);


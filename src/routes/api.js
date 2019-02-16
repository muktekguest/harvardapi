const { Router } = require("express");

const Classes = require("../controllers/Classes");
const Student = require("../controllers/Student");

const app = Router();

app.route("/classes")
  .get(Classes.index)
  .post(Classes.create);

app.route("/classes/:classId")
  .get(Classes.getById);

app.route("/classes/:classId/students")
  .get(Classes.getStudents)
  .post(Student.create);

app.route("/students")
  .get(Student.index);

app.route("/students/:studentId")
  .get(Student.getById);

module.exports = app;

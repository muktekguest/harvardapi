const ODM = require("mongoose");

const Class = require("../models/Class");
const Student = require("../models/Student");

const Controller = {
  index: (request, response) => {
    Student
      .find({})
      .select("-course")
      .exec()
      .then(students => {
        response
          .status(200)
          .json({
            meta: students.length,
            data: students
          });
      })
      .catch(e => {
        response
          .status(500)
          .json({
            error: e
          });
      });
  },

  create: (request, response) => {
    const { name, grade, email, registerNumber } = request.body;
    const { classId } = request.params;

    const newStudent = new Student({
      _id: new ODM.Types.ObjectId(),
      registerNumber,
      name,
      grade,
      email,
      course: classId
    });

    Class
      .find({ _id: classId })
      .then(found => {
        if (found.length > 0) {
          newStudent
            .save()
            .then(created => {
              found[0].students.push(created._id);
              found[0].save();

              response
                .status(200)
                .json({
                  type: "POST /classes/:classId/students",
                  data: created
                })
            })
            .catch(e => {
              response
                .status(500)
                .json({
                  error: e.message
                });
            });
        } else {
          response
            .status(404)
            .json({
              error: 404,
              message: "This class doesn’t exist"
            });
        }
      })
      .catch(e => {
        response
          .status(500)
          .json({
            error: e
          });
      });
  }
};

module.exports = Controller;

const ODM = require("mongoose");

const Class = require("../models/Class");

const Controller = {
  index: (request, response) => {
    Class
      .find({})
      .select("name")
      .exec()
      .then(classes => {
        response
          .status(200)
          .json({
            meta: classes.length,
            data: classes
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
    const { name } = request.body;

    const newClass = new Class({
      _id: new ODM.Types.ObjectId(),
      name
    });

    newClass
      .save()
      .then(created => {
        response
          .status(200)
          .json({
            type: "POST /classes",
            data: created
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

  getById: (request, response) => {
    const { classId } = request.params;

    Class
      .findOne({ _id: classId })
      .select("-students")
      .exec()
      .then(found => {
        if(found !== null) {
          response
            .status(200)
            .json({
              data: found
            });
        } else {
          response
            .status(404)
            .json({
              error: 404,
              message: "Class Not Found."
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
  },

  getStudents: (request, response) => {
    const { classId } = request.params;

    Class
      .find({ _id: classId })
      .select("students")
      .populate("students")
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
      })
  }
};

module.exports = Controller;

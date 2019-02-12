const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  registerNumber: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  course: {
    type: ODM.Schema.Types.ObjectId,
    ref: "Classes"
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = ODM.model("Student", Schema);

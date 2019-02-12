const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  students: [{
    type: ODM.Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  versionKey: false,
  timestamps: true
});

module.exports = ODM.model("Classes", Schema);

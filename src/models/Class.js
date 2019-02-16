const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  startedAt: String,
  total: String,
  students: [{
    type: ODM.Schema.Types.ObjectId,
    ref: "Student"
  }]
}, {
  versionKey: false,
  timestamps: true
});

module.exports = ODM.model("Classes", Schema);

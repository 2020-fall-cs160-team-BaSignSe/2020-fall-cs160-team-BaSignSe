const mongoose = require("mongoose");

// Make most feilds a string right now, change it later
// Need to add: start time , end time, timezone, meeting link, members .banned users, isLive
const StudyGroupSchema = new mongoose.Schema({
    // we will dynamically add the groupAdmin 
  groupAdmin: {
    type: String,
    reuired: true
  } ,
  groupName: {
    type: String,
    required: true,
    unique: true
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  repeating: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  courseId: {
    type: String,
    required: true
  },
  courseCode: {
      type: String,
      reuired: true
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CreateGroup = mongoose.model("StudyGroupSchema", StudyGroupSchema);
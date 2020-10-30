const mongoose = require("mongoose");

const Course = new mongoose.Schema({
  schoolName: {
    type: String,
    reuired: true
  } ,
  courseId: {
    type: String,
    required: true,
    unique: true
  },
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
});

module.exports = Courses = mongoose.model("courses", Course);
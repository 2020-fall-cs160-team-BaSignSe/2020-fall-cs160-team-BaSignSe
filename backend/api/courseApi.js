const express = require("express");
const router = express.Router();
const Courses = require("../../database/Course");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

// @route   GET api/course
// @desc    Get courses by filtering the database
// @access  Public
router.get(
    "/:courseId/:courseCode",
    auth,
    async (req, res) => {

        try {

            let courseId = req.params.courseId
            let courseCode = req.params.courseCode

            const docs = await Courses.find({courseId : courseId, courseCode: courseCode});
            res.json({
                docs
            })

        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    }
)

// @route   GET api/course
// @desc    Get courses by filtering the database w/ only course id
// @access  Public
router.get(
    "/:courseId/",
    auth,
    async (req, res) => {

        try {

            let courseId = req.params.courseId

            const docs = await Courses.find({courseId : courseId});
            res.json({
                docs
            })

        } catch(err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

    }
)

module.exports = router;
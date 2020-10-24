const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator"); //validation is for the checks
const CreateGroup = require("../../database/StudyGroup");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../database/UserFindNStudy");
const auth = require("../../middleware/auth");

// @route   POST api/createGroup
// @desc    register study group
// @access  Public

router.post(
    "/",
    auth, // pulling it via line 8 
    [
      check("groupName", "Group Name is required").not().isEmpty(), 
      check("startDate", "Last Name is required").not().isEmpty(),
      check("endDate", "Username is required").not().isEmpty(),
      check("repeating", "repeating").not().isEmpty(),
      check("description", "enter description").not().isEmpty(),
      check("courseId", "course id required").not().isEmpty(),
      check("courseCode", "course code is required").not().isEmpty(),
    ],

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //console.log(req.body);

        const { groupName, startDate, endDate, repeating, description, courseId, courseCode } = req.body; // deconstructing out of body and pulling it out

        try {
            //console.log(req.user.id);
            const user = await User.findById(req.user.id).select("-password"); //gets the user's document/object us with req.user.id
        //    let user = await CreateGroup.findOne({ email }); // same as {email : email}

            const groupAdmin = req.user.id; //assigning the _id to groupAdmin to figure out the person making the study group

            // if the user exists 
            if (user) { //if user exists, create the grouip

                let group = new CreateGroup({
                    groupAdmin,
                    groupName,
                    startDate,
                    endDate,
                    repeating,
                    description,
                    courseId,
                    courseCode
                })

                await group.save();

                res.json(group);

            } else { 
                return res
                .status(400)
                .json({ errors: [{ msg: "invalid credentials" }] }); // just an array of erros
            }
        } catch(err) {
            console.log(err);
            res.status(500).send('Server Erorr');
        }

    }
)


module.exports = router;
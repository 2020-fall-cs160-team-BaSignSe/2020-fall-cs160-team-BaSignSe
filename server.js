const express = require("express");
const connectDB = require("./config/db");
const { connect } = require("mongoose");
const app = express();

//connect db
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("<b>API running</b>"));

// Define Routes

app.use("/api/authFindNStudy", require("./backend/api/authFindNStudy"));
app.use("/api/usersFindNStudy", require("./backend/api/usersFindNStudy"));
app.use("/api/studyGroup", require("./backend/api/studyGroup"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// i am on mandeep brnach

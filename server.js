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
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/post", require("./routes/api/post"));
app.use("/api/usersFindNStudy", require("./routes/api/usersFindNStudy"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// i am on mandeep brnach

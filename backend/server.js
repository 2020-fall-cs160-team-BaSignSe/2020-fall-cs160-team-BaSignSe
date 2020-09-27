const express = require("express");
const mongoose = require("mongoose");
const app = express();

const users = require("./routes/api/users");

app.use(express.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

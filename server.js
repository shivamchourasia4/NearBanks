const express = require("express");
// const dotenv = require("dotenv");
const connectDB = require("./config/db");
const search = require("./routes/search");
const reviews = require("./routes/reviews");
const banks = require("./routes/banks");
const users = require("./routes/users");
const auth = require("./routes/auth");
const path = require("path");
// dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/", search);
app.use("/api/v1/", reviews);
app.use("/api/v1/", banks);
app.use("/nearbanks/", auth);
app.use("/nearbanks/", users);

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(path.resolve(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}`));

module.exports = app;

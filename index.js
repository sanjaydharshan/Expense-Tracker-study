require("dotenv").config({ path: `${process.cwd()}/.env` });
const express = require("express");
const app = express();
const cors = require("cors"); // Import the cors package
const mongoose = require("mongoose");
const expensedata = require("./models/expensemodel");
const port = process.env.APP_PORT || 4000;
const expenseroute = require("./routes/expenseroutes.js");
const userroute = require("./routes/user.js");

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("log 100");

app.use("/api/expense", expenseroute);
app.use("/api/user", userroute);

app.get("/", (req, res) => {
  console.log("log 100");
  res.send("Hello, Worldhdfkhk");
});

mongoose
  // .connect(
  //   "mongodb+srv://sanjaydharshan200:wwdpb3gHbj7lT0hP@cluster0.wc5uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  // )
  .connect("mongodb://localhost:27017/expencetracker", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("success");
    app.listen(port, () => {
      console.log("log 300");
    });
  })
  .catch((err) => {
    console.log("error");
  });

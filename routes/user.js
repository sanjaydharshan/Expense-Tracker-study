const express = require("express");
const Router = express.Router();
const {
  getUser,
  getUserbyid,
  createUser,
  updateeUser,
  deleteUser,
} = require("../controllers/usercontroller");

Router.get("/getall", getUser);
Router.get("/:id", getUserbyid);
Router.post("/", createUser);
Router.put("/:id", updateeUser);
Router.delete("/:id", deleteUser);

module.exports = Router;

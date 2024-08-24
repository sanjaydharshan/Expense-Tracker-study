const express = require("express");
const Router = express.Router();
const {
  getExpense,
  getExpensebyid,
  createExpense,
  updateeExpense,
  deleteExpense,
} = require("../controllers/expencecontroller");

Router.get("/getall", getExpense);
Router.get("/:id", getExpensebyid);
Router.post("/", createExpense);
Router.put("/:id", updateeExpense);
Router.delete("/:id", deleteExpense);

module.exports = Router;

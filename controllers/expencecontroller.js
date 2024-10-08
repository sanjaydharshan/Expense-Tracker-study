const expensedata = require("../models/expensemodel");
// const client = require("../postgresdb");
// const queries = require("../queries");

const getExpense = async (req, res) => {
  // try {
  //   const result = await client.query(queries.Getall("expense"));
  //   console.log("Query result:", result.rows);
  //   res.json(result.rows);
  // } catch (err) {
  //   console.error("Error executing query", err);
  //   res.status(500).send("Internal Server Error");
  // }
  try {
    const expense = await expensedata.find();
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const getExpensebyid = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensedata.findById(id);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }

  // try {
  //   const { id } = req.params;
  //   const expense = await client.query(queries.GetId("expense"), [id]);
  //   res.status(200).json(expense.rows);
  // } catch {
  //   res.status(500).send("Internal Server Error");
  // }
};

const createExpense = async (req, res) => {
  try {
    console.log(req.body, "dfjhdskfjdshk");
    const expense = await expensedata.create(req.body);
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    if (e.name === "ValidationError") {
      const errors = Object.values(e.errors).map((err) => err.message);
      return res.status(400).json({ message: errors.join(", ") });
    }
    res.status(500).json({ message: e.message });
  }
};

const updateeExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensedata.findByIdAndUpdate(id, req.body);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    const updateexpense = await expensedata.findById(id);
    res.status(200).json({
      status: "success",
      data: updateexpense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expensedata.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    res.status(200).json({ message: "expense deleted successfully" });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};
module.exports = {
  getExpense,
  getExpensebyid,
  createExpense,
  updateeExpense,
  deleteExpense,
};

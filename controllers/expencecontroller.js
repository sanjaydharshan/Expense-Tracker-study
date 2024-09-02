const expensedata = require("../models/expensemodel");
const client = require("../postgresdb")
const getExpense = async (req, res) => {
  try {
    console.log('Received request to /users');
    const result = await client.query('SELECT * FROM expense');
    console.log('Query result:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Internal Server Error');
  }
};

const getExpensebyid = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await expensedata.findById(id);
    res.status(200).json(expense);
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const expense = await expensedata.create(req.body);
    res.status(200).json(expense);
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
    res.status(200).json(updateexpense);
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

const usermodeldata = require("../models/user");
// const client = require("../postgresdb");
// const queries = require("../queries");

const getUser = async (req, res) => {
  // try {
  //   const result = await client.query(queries.Getall("expense"));
  //   console.log("Query result:", result.rows);
  //   res.json(result.rows);
  // } catch (err) {
  //   console.error("Error executing query", err);
  //   res.status(500).send("Internal Server Error");
  // }
  try {
    const expense = await usermodeldata.find();
    res.status(200).json({
      status: "success",
      data: expense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const getUserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await usermodeldata.findById(id);
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

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const expenseall = await usermodeldata.find();
    console.log(expenseall, "dfjhdskfjdshk");
    expenseall.map((expense) => {
      console.log(expense.email, "dfjhdskfjdshk");
      if (expense.email === req.body.email) {
        return res.status(400).json({ message: "User already exists" });
      }
    });
    const expense = await usermodeldata.create(req.body);
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

const updateeUser = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await usermodeldata.findByIdAndUpdate(id, req.body);
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }
    const updateexpense = await usermodeldata.findById(id);
    res.status(200).json({
      status: "success",
      data: updateexpense,
    });
  } catch (e) {
    console.error("Error creating expense:", e);
    res.status(500).json({ message: e.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await usermodeldata.findByIdAndDelete(id);
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
  getUser,
  getUserbyid,
  createUser,
  updateeUser,
  deleteUser,
};

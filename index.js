const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expensedata = require("./models/expensemodel");
const port = 3000;
const expenseroute = require("./routes/expenseroutes.js");
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/expense", expenseroute);
app.get("/", (req, res) => {
  console.log("log 100");
  res.send("Hello, Worldhdfkhk");
});

// app.get("/api/expense/getall", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send(req.body);
//   try {
//     const expense = await expensedata.find({});
//     res.status(200).json(expense);
//   } catch (e) {
//     console.error("Error creating expense:", e);
//     res.status(500).json({ message: e.message });
//   }
// });

// app.get("/api/expense/:id", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send(req.body);
//   try {
//     const { id } = req.params;

//     const expense = await expensedata.findById(id);
//     res.status(200).json(expense);
//   } catch (e) {
//     console.error("Error creating expense:", e);
//     res.status(500).json({ message: e.message });
//   }
// });

// app.post("/api/expense", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send(req.body);
//   try {
//     const expense = await expensedata.create(req.body);
//     res.status(200).json(expense);
//   } catch (e) {
//     console.error("Error creating expense:", e);
//     if (e.name === "ValidationError") {
//       const errors = Object.values(e.errors).map((err) => err.message);
//       return res.status(400).json({ message: errors.join(", ") });
//     }
//     res.status(500).json({ message: e.message });
//   }
// });

// app.put("/api/expense/:id", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send(req.body);
//   try {
//     const { id } = req.params;
//     const expense = await expensedata.findByIdAndUpdate(id, req.body);
//     if (!expense) {
//       return res.status(404).json({ message: "expense not found" });
//     }
//     const updateexpense = await expensedata.findById(id);
//     res.status(200).json(updateexpense);
//   } catch (e) {
//     console.error("Error creating expense:", e);
//     res.status(500).json({ message: e.message });
//   }
// });

// app.delete("/api/expense/:id", async (req, res) => {
//   //   console.log(req.body);
//   //   res.send(req.body);
//   try {
//     const { id } = req.params;
//     const expense = await expensedata.findByIdAndDelete(id);
//     if (!expense) {
//       return res.status(404).json({ message: "expense not found" });
//     }
//     res.status(200).json({ message: "expense deleted successfully" });
//   } catch (e) {
//     console.error("Error creating expense:", e);
//     res.status(500).json({ message: e.message });
//   }
// });

mongoose
  .connect(
    "mongodb+srv://sanjaydharshan200:wwdpb3gHbj7lT0hP@cluster0.wc5uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then((result) => {
    console.log("success");
    app.listen(port, () => {
      console.log("log 300");
    });
  })
  .catch((err) => {
    console.log("error");
  });

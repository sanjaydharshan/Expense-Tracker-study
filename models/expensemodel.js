const mongoose = require("mongoose");

const expense = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, "required amount"],
  },
  category: {
    type: String,
    required: [true, "required category"],
  },
  description: {
    type: String,
    required: [false],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "required Date"],
    format: "YYYY-MM-DD",
  },
  payment_method: {
    type: String,
    required: [true, "required paymentmethod"],
  },
});

const expensedata = mongoose.model("expensedata", expense);

module.exports = expensedata;

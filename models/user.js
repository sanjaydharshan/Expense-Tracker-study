const mongoose = require("mongoose");

const usermodel = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (value) {
        return (
          /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value)
        );
      },
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  },
  firstname: {
    type: String,
    required: [true, "Firstname is required"],
  },
  lastname: {
    type: String,
    required: [true, "Lastname is required"],
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  modifiedDate: {
    type: Date,
    default: Date.now,
  },
});

usermodel.pre("save", function (next) {
  this.modifiedDate = Date.now();
  next();
});

const usermodeldata = mongoose.model("usermodeldata", usermodel);

module.exports = usermodeldata;

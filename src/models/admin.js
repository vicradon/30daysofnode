const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const setPassword = (value) => {
  return bcrypt.hashSync(value, 10);
};

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: setPassword,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
});

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;

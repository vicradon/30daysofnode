const mongoose = require("mongoose");
const hashPassword = require("../utils/hash_password");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    set: hashPassword,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  farms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Farm" }],
  role: {
    type: String,
    default: "employee",
    enum: ["employee", "owner"],
  },
  workReport: [
    {
      arrivalTime: Date,
      leaveTime: Date,
      report: [
        {
          date: Date,
          tasks: [
            {
              name: String,
              done: Boolean,
            },
          ],
        },
      ],
      tasks: {
        date: Date,
      },
    },
  ],
  token: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

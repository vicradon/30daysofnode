const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({
      email,
    });

    if (!admin) {
      throw new Error("Email not found");
    }
    if (bcrypt.compareSync(password, admin.password)) {
      const token = jwt.sign({ admin: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      await Admin.findByIdAndUpdate(admin._id, { token });
      res.status(200).json({
        admin,
        message: "logged in successfully",
      });
    } else {
      res.status(401).json({
        message: "Password incorrect",
      });
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  login,
};

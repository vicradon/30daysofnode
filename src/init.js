"use strict";
const Admin = require("./models/admin");
const jwt = require("jsonwebtoken");

const init = () => {
  return new Promise((resolve, reject) => {
    Admin.findOne({ email: process.env.ADMIN_EMAIL }, (err, admin) => {
      if (err) throw err;
      if (!admin) {
        const admin = new Admin({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          firstName: process.env.ADMIN_FIRST_NAME,
          lastName: process.env.ADMIN_LAST_NAME,
        });
        const token = jwt.sign({ admin: admin._id }, process.env.JWT_SECRET, {
          expiresIn: "100d",
        });
        admin.token = token;
        admin.save((err) => {
          if (err) reject(err);
          resolve();
        });
      } else {
        resolve();
      }
    });
  });
};

module.exports = init;

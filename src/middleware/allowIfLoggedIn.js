const jwt = require('jsonwebtoken')
const User = require('../models/user')

const allowIfLoggedin = async (req, res, next) => {
  try {
    let token
    if (req.headers.authorization) {
      token = req.headers.authorization.slice(7);
    }

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.status(403).json({
            error: "You have been logged out. Login to access this route"
          });
        }
        req.user = await User.findById(user.user);
        next();
      })
    } else {
      return res.status(401).json({
        error: "You need to be logged in to access this route"
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = allowIfLoggedin
const promise = require("bluebird");

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require("pg-promise")(options);
const connectionString = "postgres://localhost:5432/puppies";
const db = pgp(connectionString);

// add query functions

function getAllPuppies(req, res, next) {
  db.any("select * from pups")
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ALL puppies",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies,
  // getSinglePuppy,
  // createPuppy,
  // updatePuppy,
  // removePuppy,
};

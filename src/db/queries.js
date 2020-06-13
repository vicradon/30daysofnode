const promise = require("bluebird");

const options = {
  // Initialization Options
  promiseLib: promise,
};

const pgp = require("pg-promise")(options);
const connectionString = process.env.DATABASE_URL;
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

function getSinglePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.one("select * from pups where id = $1", pupID)
    .then(function (data) {
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved ONE puppy",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPuppy(req, res, next) {
  const age = parseInt(req.body.age);
  const { name, breed, sex } = req.body;
  const data = {age, name, breed, sex}
  Object.keys(data).forEach((x) => {
    if (!data[x]){
      throw new Error("Data not supplied")
    }
  })
  db.none(
    "insert into pups(name, breed, age, sex)" +
      "values(${name}, ${breed}, ${age}, ${sex})",
    data
  )
    .then(function () {
      res.status(200).json({
        status: "success",
        message: "Inserted one puppy",
      });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllPuppies,
  getSinglePuppy,
  createPuppy,
  // updatePuppy,
  // removePuppy,
};

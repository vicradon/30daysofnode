const apiRes = require("../helpers/api_response");
const db = require('./index')

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
  const data = { age, name, breed, sex };
  Object.keys(data).forEach((x) => {
    if (!data[x]) {
      return apiRes.errorResponse(res, `${x} was not supplied`, 400);
    }
  });
  db.none(
    "insert into pups(name, breed, age, sex)" +
      "values(${name}, ${breed}, ${age}, ${sex})",
    data
  )
    .then(function () {
      apiRes.successResponse(res, "Inserted one puppy");
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePuppy(req, res, next) {
  db.none('update pups set name=$1, breed=$2, age=$3, sex=$4 where id=$5',
    [req.body.name, req.body.breed, parseInt(req.body.age),
      req.body.sex, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated puppy'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePuppy(req, res, next) {
  var pupID = parseInt(req.params.id);
  db.result('delete from pups where id = $1', pupID)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
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
  updatePuppy,
  removePuppy,
};

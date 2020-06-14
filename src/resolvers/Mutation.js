const People = require("../schema/mongoose/person");

const createPerson = async (parent, args) => {
  const newPerson = new People({ first: args.first, last: args.last });
  const error = await newPerson.save();
  if (error) return error;
  return newPerson;
};

const deletePerson = async (parent, args) => {
  const person = await People.findByIdAndDelete(args.id, (err) => {
    if (err) return err;
  });
  return person;
};

module.exports = {
  createPerson,
  deletePerson,
};

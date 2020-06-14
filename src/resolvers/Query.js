const People = require('../schema/mongoose/person')

const greeting = () => `Hello World`;
const people = () => People.find({})

module.exports = {
  greeting,
  people
}
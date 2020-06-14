const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  first: { type: String },
  last: { type: String }
})

const People = mongoose.model('People', peopleSchema)

module.exports = People
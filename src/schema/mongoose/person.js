const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const peopleSchema = new Schema({
  first: {
    type: String
  },
  last: {
    type: String
  },
  username: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { collection: 'people' })

const People = mongoose.model('People', peopleSchema)

module.exports = People
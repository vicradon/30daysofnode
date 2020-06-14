const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const textbookSchema = new Schema({
  name: { type: String },
  publisher: { type: String },
  category: { type: String },
});

const Textbook = mongoose.model("Textbooks", textbookSchema);

module.exports = Textbook;

const Textbook = require("../schema/mongoose/textbook");

const textbook = async (parent, args) => {
  const textbook = await Textbook.findById(args.id);
  return textbook;
};
const textbooks = async () => {
  const textbooks = await Textbook.find({});
  return textbooks
};

module.exports = {
  textbook,
  textbooks,
};

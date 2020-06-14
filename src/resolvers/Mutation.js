const Textbook = require("../schema/mongoose/textbook");

const addTextbook = async (parent, args) => {
  const textbook = new Textbook({ name: args.name, publisher: args.publisher,  });
  await textbook.save();
  
  return textbook;
};

const deleteTextbook = async (parent, args) => {
  const deleted = await Textbook.findByIdAndDelete(args.id, (err) => {
    if (err) return err;
  });
  return deleted;
};

module.exports = {
  addTextbook,
  deleteTextbook,
};

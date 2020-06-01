const PasswordValidator = require("password-validator");

const validate = (password) => {
  const schema = new PasswordValidator();

  schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().symbols()
    .has().digits()
    .is().not().oneOf([
      "Passw0rd",
      "Password123",
      "correct horse battery staple",
      "password",
    ]);

  const validityFails = schema.validate(password, { list: true });
  const validityMsg = [];

  
  validityFails.forEach((x) => {
    if (x === "min") {
      validityMsg.push("Password is less than 8 characters.");
    } else if (x === "uppercase") {
      validityMsg.push("Password has no uppercase.");
    } else if (x === "lowercase") {
      validityMsg.push("Password has no lowercase.");
    } else if (x === "symbols") {
      validityMsg.push("Password has no special character.");
    } else if (x === "digits") {
      validityMsg.push("Password has no digits.");
    } else if (x === "oneOf") {
      validityMsg.push("Password is too weak.");
    }
  });
  if (validityMsg.length > 0) {
    const errorMessage = validityMsg.join(" ");
    return { status: 400, message: errorMessage };
  }
  return { status: 200, message: "valid" };
};

module.exports = validate;

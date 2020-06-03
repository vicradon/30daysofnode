const twilio = require("twilio");
const { BadRequest } = require("../utils/error");

const send = (req, res, next) => {
  try {
    const { number } = req.params;
    const { message } = req.body;

    if (!message) {
      throw new BadRequest("message wasn't provided");
    }

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    client.messages
      .create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${number}`,
      })
      .then(() =>
        res.status(201).json({ message: "successfully sent message to number" })
      )
      .catch((error) => next(error))
      .done();
  } catch (error) {
    next(error);
  }
};

module.exports = { send };

const express = require("express");
const app = express();
require("dotenv").config();
const handleError = require("./middleware/error");
const mdtohtmlRouter = require("./routes/mdtohtml");
const twilio = require("twilio");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

client.messages
  .create({
    body: "Testing the twillo API",
    from: "whatsapp:+14155238886",
    to: "whatsapp:+2348105487627",
  })
  .then((message) => console.log(message.sid))
  .done();
  

app.use("/api/v1/mdtohtml", mdtohtmlRouter);

app.use(handleError);
app.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);

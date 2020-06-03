const express = require("express");
const app = express();
require("dotenv").config();
const handleError = require("./middleware/error");
const emailRouter = require("./routes/email");
const messagingRouter = require("./routes/messaging");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/messaging", messagingRouter);

app.use(handleError);
app.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);

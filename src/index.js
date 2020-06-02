const express = require("express");
const app = express();
require("dotenv").config();
const handleError = require("./middleware/error");
const mdtohtmlRouter = require("./routes/mdtohtml");
const fileUpload = require('express-fileupload')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 },
  abortOnLimit: true
}));

app.use("/api/v1/mdtohtml", mdtohtmlRouter);

app.use(handleError);
app.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);

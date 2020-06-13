const express = require("express");
const app = express();
require("dotenv").config();
const puppyRouter = require("./routes/puppy");

app.use(express.json());

app.use("/api/v1/puppies", puppyRouter);

app.use(handleError);
app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);

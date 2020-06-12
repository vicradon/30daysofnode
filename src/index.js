const express = require("express");
const app = express();
require("dotenv").config();
const puppyRouter = require("./routes/puppy");

app.use("/api/v1/puppies", puppyRouter);

app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);

module.exports = router;

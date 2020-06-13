const express = require("express");
const app = express();
require("dotenv").config();
const puppyRouter = require("./routes/puppies");
const apiResponse = require('./helpers/api_response')
const errorHandler = require('./middleware/error')
app.use(express.json());

app.use("/api/v1/puppies", puppyRouter);


// throw 404 if URL not found
app.all("*", (req, res) => {
	return apiResponse.notFoundResponse(res, "URL not found");
});  

app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log(`server running on http://localhost:${process.env.PORT}`)
);

const express = require("express");
const app = express();
const handleError = require("./middleware/error");
const postsRouter = require("./routes/posts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * The order of these middleswares are important
 * The auth route is public
 */
//Auth to be added in another challenge

/**
 * Add all other routes here
 */
app.use("/api/v1/posts", postsRouter);

app.use(handleError);
app.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);

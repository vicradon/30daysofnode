const express = require("express");
const app = express();
const handleError = require("./middleware/error");
const postsRouter = require("./routes/posts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/posts", postsRouter);

app.use(handleError);
app.listen(process.env.PORT);
console.log(`Server running at http://localhost:${process.env.PORT}/`);

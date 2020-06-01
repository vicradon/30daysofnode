const base = require("../base");
const { BadRequest, TimedOut } = require("../utils/error");

const getPosts = (req, res, next) => {
  try {
    const { max } = req.params;
    base("posts")
      .select({
        // Selecting the first 3 records in Grid view:
        maxRecords: Number(max),
        view: "Grid view",
      })
      .eachPage(
        (page = (records, fetchNextPage) => {
          // This function (`page`) will get called for each page of records.

          const posts = records.map((record) => record._rawJson);
          res.json({
            posts,
            message: `First ${posts.length} posts`,
            status: "success",
          });
          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        }),
        (done = (err) => {
          if (err) {
            if (err.code === "ETIMEDOUT") {
              res.status(408).json({ message: "Request timed out" });
            } else {
              res.status(400).json({ message: "An error occured" });
            }
          }
        })
      );
  } catch (error) {
    next(error);
  }
};

const createPost = (req, res, next) => {
  try {
    base("posts").create([req.body], (error, post) => {
      if (error) {
        res.status(400).json({ message: error });
      } else {
        res.status(200).json({
          post: post[0]._rawJson,
          message: "Create post successful",
          status: "success",
        });
      }
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequest("id not supplied");
    }
    const { title } = req.body;
    const publishedBy = req.body["published by"];
    const blogData = req.body["blog data"];

    Object.keys({ title, publishedBy, blogData }).map((x) => {
      if (x === undefined) {
        throw new BadRequest(`${x} was not supplied`);
      }
    });
    const updateObject = {
      title,
      "published by": publishedBy,
      "blog data": blogData,
    };
    base("posts").update(id, updateObject, function (err, record) {
      if (err) {
        console.error(err);
        return;
      }
      res.status(200).json({
        record: record._rawJson,
        status: "success",
        message: "successfully updated record",
      });
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequest("id not supplied");
    }
    base("posts").destroy(id, (err) => {
      if (err) {
        throw new BadRequest(err);
      } else {
        res.status(200).json({ message: "deleted post", status: "success" });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPosts, createPost, deletePost, updatePost };

const router = require("express").Router();
const postsController = require("../controllers/post");
router.get("/:max", postsController.getPosts);
router.patch("/:id", postsController.updatePost);
router.post("/", postsController.createPost);
router.delete("/:id", postsController.deletePost);

module.exports = router;

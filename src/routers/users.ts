const router = require("express").Router();
const users = require("../controller/users");

router.get("/:id", users.getUser);
router.get("/", users.getUsers);

module.exports = router;

const router = require("express").Router();
const messagingController = require("../controllers/messaging");
router.post("/", messagingController.send);

module.exports = router;

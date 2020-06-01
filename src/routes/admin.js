const { Router } = require("express");
const adminController = require("../controllers/admin");
const router = Router();

router.post("/login", adminController.login);

module.exports = router;

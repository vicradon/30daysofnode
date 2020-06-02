const router = require("express").Router();
const mdtohtmlController = require("../controllers/mdtohtml");
router.post("/", mdtohtmlController.convert);
router.post("/upload", mdtohtmlController.uploadAndConvert);

module.exports = router;

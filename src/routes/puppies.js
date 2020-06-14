const router = require("express").Router();
const db = require("../db/queries");

router.get("/", db.getAllPuppies);
router.get("/:id", db.getSinglePuppy);
router.post("/", db.createPuppy);
router.put("/:id", db.updatePuppy);
router.delete("/:id", db.removePuppy);

module.exports = router;

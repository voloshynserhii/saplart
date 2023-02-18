const express = require("express");

const Tags = require("../controllers/Tags");
const router = express.Router();

router.get("/", Tags.Get);
router.post("/", Tags.Add);

module.exports = router;

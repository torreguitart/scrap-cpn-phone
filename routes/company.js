const express = require("express");
const cpnCtrl = require("../controllers/company");

let router = express.Router();

// POST company name (+options)
router.post("/", cpnCtrl.scrapCpn);

module.exports = router;

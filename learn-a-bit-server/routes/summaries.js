const express = require("express");
const router = express.Router({ mergeParams: true });
const { getSummaries } = require("../handlers/summaries");

router.route("/")
    .get(getSummaries)

module.exports = router;
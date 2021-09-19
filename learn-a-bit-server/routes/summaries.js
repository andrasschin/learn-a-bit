const express = require("express");
const router = express.Router({ mergeParams: true });
const { getSummaries, switchUpdootOnSummary } = require("../handlers/summaries");
const { getUpdootedSummaries } = require("../handlers/updooted-summaries")

router.route("/")
    .get(getSummaries)

module.exports = router;
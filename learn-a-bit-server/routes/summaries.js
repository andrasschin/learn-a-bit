const express = require("express");
const router = express.Router({ mergeParams: true });
const { getSummaries, switchUpdootOnSummary } = require("../handlers/summaries");

router.route("/")
    .get(getSummaries)
    .post(switchUpdootOnSummary)

module.exports = router;
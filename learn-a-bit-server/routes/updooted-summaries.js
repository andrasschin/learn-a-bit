const express = require("express");
const router = express.Router({ mergeParams: true });
const { getUpdootedSummaries, addUpdootToSummary, removeUpdootFromSummary } = require("../handlers/updooted-summaries");

router.route("/")
    .get(getUpdootedSummaries)
    .post(addUpdootToSummary)

router.route("/:summary_id")
    .delete(removeUpdootFromSummary)

module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const { getSummaries, createSummary, showSummary, updateSummary, deleteSummary} = require("../handlers/user-summaries.js"); 

router.route("/")
    .get(getSummaries)
    .post(createSummary)

router.route("/:summary_id")
    .get(showSummary)
    .put(updateSummary)
    .delete(deleteSummary)


module.exports = router;
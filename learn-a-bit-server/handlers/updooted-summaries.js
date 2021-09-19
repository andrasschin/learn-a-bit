const db = require("../models");

// * /users/:user_id/summaries/updooted-summaries

// * GET 
exports.getUpdootedSummaries = async function (req, res, next){
    try {
        const user = await db.User.findById(req.params.user_id).populate("updootedSummaries");
        
        res.status(200).json(user.updootedSummaries);
    } catch (err) {
        next(err)
    }
}

// * POST
exports.addUpdootToSummary = async function (req, res, next) {
    try {
        const userId = req.params.user_id;
        const summaryId = req.body.summary_id;

        const user = await db.User.findById(userId);
        const summary = await db.Summary.findById(summaryId);

        user.updootedSummaries.push(summaryId);
        summary.updoots.push(userId);
        summary.updootsCount++;

        await user.save();
        await summary.save();

        res.status(200).json(summary);
    } catch (err) {
        next(err)
    }
}

// * DELETE
exports.removeUpdootFromSummary = async function (req, res, next) {
    try {
        const userId = req.params.user_id;
        const summaryId = req.params.summary_id;

        const user = await db.User.findById(userId);
        const summary = await db.Summary.findById(summaryId);

        user.updootedSummaries.pull(summaryId);
        summary.updoots.pull(userId);
        summary.updootsCount--;

        await user.save();
        await summary.save();

        res.status(200).json(summary);
    } catch (err) {
        next(err)
    }
}
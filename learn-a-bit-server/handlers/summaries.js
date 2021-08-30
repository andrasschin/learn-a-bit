const db = require("../models");

exports.getSummaries = async function (req, res, next) {
    try {
        let summaries = await db.Summary.find({}).populate("author").sort({createdAt: -1});
        let summariesList = summaries.map(summary => {
            return {
                ...summary._doc,
                author: summary.author.username
            }
        })

        res.status(200).json(summariesList);
    } catch (err) {
        next(err);
    }
}

exports.switchUpdootOnSummary = async function (req, res, next) {
    try {
        const updootingUserId = req.body.user_id;
        const summaryId = req.body.summary_id;
        
        let summary = await db.Summary.findById(summaryId);
        let user = await db.User.findById(updootingUserId);

        let isUserInUpdoots = summary.updoots.some(userId => {
            return userId.equals(updootingUserId);
        })

        if (isUserInUpdoots){
            summary.updoots.pull(updootingUserId);
            user.updootedSummaries.pull(summaryId);
        } else {
            summary.updoots.push(updootingUserId);
            user.updootedSummaries.push(summaryId);
        }

        await summary.save();
        await user.save();

        res.status(200).json(summary);
    } catch (err) {
        next(err);
    }
}
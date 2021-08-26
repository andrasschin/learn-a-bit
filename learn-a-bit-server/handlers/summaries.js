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
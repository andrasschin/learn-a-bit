const db = require("../models");

exports.getSummaries = async function (req, res, next) {
    try {
        const customSearchParams = turnObjValuesToRegExp(
            JSON.parse(req.query.customSearchParams)
        );
        
        let summaries = await db.Summary.find(customSearchParams)
            .populate("author")
            .sort(JSON.parse(req.query.sortByParams));

        res.status(200).json(summaries);
    } catch (err) {
        next(err);
    }
}

const turnObjValuesToRegExp = (obj) => {
    return Object.entries(obj).reduce((result, [key, value]) => {
    	result[key] = new RegExp(`^.*${value}.*$`, "i")
        return result
    }, {})
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
            summary.updootsCount--;
            user.updootedSummaries.pull(summaryId);
        } else {
            summary.updoots.push(updootingUserId);
            summary.updootsCount++;
            user.updootedSummaries.push(summaryId);
        }

        await summary.save();
        await user.save();

        res.status(200).json(summary);
    } catch (err) {
        next(err);
    }
}
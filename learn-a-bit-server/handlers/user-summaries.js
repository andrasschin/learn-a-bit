const db = require("../models");

// * /users/:user_id/summaries

// * GET
exports.getSummaries = async function (req, res, next){
    try {
        let user = await db.User.findById(req.params.user_id).populate("summaries");

        res.status(200).json(user.summaries);
    } catch (err) {
        next(err);
    }
}

// * POST
exports.createSummary = async function (req, res, next) {
    try {
        let summary = await db.Summary.create({
            author: req.params.user_id,
            ...req.body
        });
    
        let user = await db.User.findById(req.params.user_id);
        user.summaries.push(summary.id);
        await user.save();
    
        res.status(201).json(summary);
    } catch (err) {
        next(err);
    }
}

// * /users/:user_id/summaries/:summary_id

// * GET
exports.showSummary = async function (req, res, next) {
    try {
        let summary = await db.Summary.findById(req.params.summary_id);
        res.status(200).json(summary);
    } catch (err) {
        next(err);
    }
}

// * UPDATE
exports.updateSummary = async function (req, res, next) {
    try {
        let summary = await db.Summary.findById(req.params.summary_id);
        summary.updateWithReqBody(req.body);
        res.status(200).json(summary);
    } catch (err) {
        next(err);
    }
}

// * DELETE
exports.deleteSummary = async function (req, res, next) {
    try {
        let summary = await db.Summary.findById(req.params.summary_id).populate("author");
        let user = await db.User.findById(summary.author._id);
        
        // * Delete summary from the user model
        user.summaries.pull(summary._id);
        await user.save();

        // * Delete summary id from user's that have updooted it
        for (const updootUserId of summary.updoots) {
            let updootUser = await db.User.findById(updootUserId);
            updootUser.updootedSummaries.pull(summary._id);
        }
        
        await db.Summary.findByIdAndDelete(summary._id);
        res.status(200).json(summary);
    } catch (err) {
        next(err);
    }
}
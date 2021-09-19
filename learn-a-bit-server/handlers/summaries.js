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
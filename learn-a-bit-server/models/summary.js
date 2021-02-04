const mongoose = require("mongoose");
const { Schema } = mongoose;

let summarySchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    source: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/**
 * Updates an instance of the summary model with the provided values.
 * @param {Object} params New values for the summary. Keys must match with the ones in the model, but only the changed keys are needed.
 * @param {Function} next Provided by Express.
 */
summarySchema.methods.updateWithReqBody = async function (params, next) {
    try {
        Object.keys(params).forEach(param => {
            if (this[param]) this[param] = params[param];
        });
        await this.save();
        console.log("JÓ JÓJÓ JÓÓ JÓJ");
    } catch (err) {
        next(err);
    }
}

let Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;
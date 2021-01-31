const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

let summarySchema = Schema({
    source: String,
    title: String,
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

let Summary = mongoose.model("Summary", summarySchema);

module.exports = Summary;
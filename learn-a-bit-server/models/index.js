const mongoose = require("mongoose");
mongoose.set("debug", true);
const dbURI = process.env.MONGODB_URI || "mongodb://localhost:27017/learn-a-bit";
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

(async () => {
    try {
        await mongoose.connect(dbURI, dbOptions);
        console.log("db is connected");
    } catch (err) {
        console.log('error: ' + err)
    }
})()

module.exports.User = require("./user");
module.exports.Summary = require("./summary");
module.exports.YoutubeChannel = require("./youtube-channel");
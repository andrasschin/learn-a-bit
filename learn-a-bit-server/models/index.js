const mongoose = require("mongoose");
mongoose.set("debug", true);

// mongoose.connect()

module.exports.User = require("./user");
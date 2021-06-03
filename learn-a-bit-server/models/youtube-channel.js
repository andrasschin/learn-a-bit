const mongoose = require("mongoose");
const { Schema } = mongoose;

let youtubeChannelSchema = new Schema({
    channelName: {
        type: String,
        required: true
    },
    channelId:{
        type: String,
        required: true,
        unique: true
    } 
})

let YoutubeChannel = mongoose.model("YoutubeChannel", youtubeChannelSchema);

module.exports = YoutubeChannel;
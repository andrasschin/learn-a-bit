const express = require("express");
const router = express.Router({ mergeParams: true });
const { getChannels, createChannel, deleteChannel } = require("../handlers/youtube-channels.js");
const { getRandomVideo } = require("../handlers/youtube-data-api");

router.route("/")
    .get(getChannels)
    .post(createChannel)
    
router.route("/:youtube_channel_id")
    .delete(deleteChannel)

router.route("/:youtube_channel_id/randomvideo")
    .get(getRandomVideo)

module.exports = router;
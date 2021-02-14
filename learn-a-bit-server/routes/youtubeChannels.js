const express = require("express");
const router = express.Router({ mergeParams: true });
const { getChannels, createChannel, deleteChannel } = require("../handlers/youtubeChannels.js");

router.route("/")
    .get(getChannels)
    .post(createChannel)
    
router.route("/:youtube_channel_id")
    .delete(deleteChannel)

module.exports = router;
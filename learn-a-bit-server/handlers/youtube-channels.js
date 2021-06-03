const db = require("../models");

exports.getChannels = async function (req, res, next){
    try {
        let user = await db.User.findById(req.params.user_id).populate("youtubeChannels");
        
        res.status(200).json(user.youtubeChannels);
    } catch (err) {
        return next(err);
    }
}

exports.createChannel = async function (req, res, next){
    try {
        let channel = await db.YoutubeChannel.create(req.body);

        let user = await db.User.findById(req.params.user_id);
        user.youtubeChannels.push(channel.id);
        await user.save();

        res.status(201).json(channel);
    } catch (err) {
        return next(err);
    }
}

exports.deleteChannel = async function (req, res, next){
    try {
        let channel = await db.YoutubeChannel.findById(req.params.youtube_channel_id);
        channel.remove();

        let user = await db.User.findById(req.params.user_id);
        let idx = user.youtubeChannels.findIndex(channel => req.params.youtube_channel_id === channel.id.toString());
        user.youtubeChannels.splice(idx, 1);
        await user.save();

        res.status(200).json(channel);
    } catch (err) {
        return next(err);
    }
}
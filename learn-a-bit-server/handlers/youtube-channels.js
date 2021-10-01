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
        let user = await db.User.findById(req.params.user_id);
        
        user.youtubeChannels.pull(channel._id);
        await user.save();
        
        await db.YoutubeChannel.findByIdAndDelete(channel._id);
        res.status(200).json(channel);
    } catch (err) {
        return next(err);
    }
}
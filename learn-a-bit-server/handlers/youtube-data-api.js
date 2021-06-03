const fetch = require("node-fetch");
const API_BASE = "https://www.googleapis.com/youtube/v3";

const db = require("../models");

exports.getRandomVideo = async function (req, res, next) {
    let youtubeChannel = await db.YoutubeChannel.findById(req.params.youtube_channel_id);

    getPlaylistId(youtubeChannel.channelId)
        .then(id => {
            getPlaylistVideos(id)
                .then(videos => {
                    let mappedVideos = videos.map(video => {
                        return {
                            channelTitle: video.snippet.channelTitle,
                            videotitle: video.snippet.title,
                            videoId: video.contentDetails.videoId,
                            videoPublishedAt: video.contentDetails.videoPublishedAt
                        }
                    })
                    res.json(mappedVideos);
                })
                .catch(err => {
                    console.log(err);
                    res.send(err);
                })
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
}

function getPlaylistId(channelId){
    let API_CHANNELS = new URL(API_BASE + "/channels");
    let params = {
        key: process.env.YT_DATA_API_KEY,
        id: channelId,
        part: "contentDetails"
    }
    
    // Append query params
    Object.keys(params).forEach(key => API_CHANNELS.searchParams.append(key, params[key]));
    
    return new Promise(function(resolve, reject){
        fetch(API_CHANNELS)
            .then(res => res.json())
            .then(data => {
                resolve(data.items[0].contentDetails.relatedPlaylists.uploads);
            })
            .catch(err => {
                reject(err);
            })
    })
}

function getPlaylistVideos(playlistId){
    let API_PLAYLISTS = new URL(API_BASE + "/playlistItems")
    let params = {
        key: process.env.YT_DATA_API_KEY,
        maxResults: 50,
        part: "snippet,contentDetails",
        playlistId: playlistId
    }

    // Append query params
    Object.keys(params).forEach(key => API_PLAYLISTS.searchParams.append(key, params[key]));

    return new Promise(function(resolve, reject) {
        fetch(API_PLAYLISTS)
            .then(res => res.json())
            .then(data => {
                resolve(data.items);
            })
            .catch(err => {
                reject(err);
            })
    })

}
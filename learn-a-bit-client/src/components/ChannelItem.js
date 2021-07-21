import React from "react";

const ChannelItem = props => {
    const { id, channelId, channelName} = props;
    return (
        <div className="channel-list-item">
            {channelName} <span className="channel-list-item-remove-btn"><i className="far fa-minus-square"></i></span>
        </div>
    )
}

export default ChannelItem;
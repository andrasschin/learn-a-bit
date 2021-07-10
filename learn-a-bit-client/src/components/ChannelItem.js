import React from "react";

const ChannelItem = props => {
    const { id, channelId, channelName} = props;
    return (
        <div>
            <h3>{channelName}</h3>
            <h4>Youtube id: {channelId}</h4>
        </div>
    )
}

export default ChannelItem;
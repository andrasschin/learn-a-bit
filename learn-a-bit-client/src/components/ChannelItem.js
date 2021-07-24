import React from "react";

const ChannelItem = props => {
    const { id, channelId, channelName, onDelete} = props;
    return (
        <div className="channel-list-item">
            {channelName} 
            <span 
                className="channel-list-item-remove-btn"
                onClick={onDelete}
            >
                <i className="far fa-minus-square"></i>
            </span>
        </div>
    )
}

export default ChannelItem;
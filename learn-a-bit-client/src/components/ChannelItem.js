import React from "react";

const ChannelItem = props => {
    const { channelName, onDelete, onSetCurrentChannel } = props;
    return (
        <div 
            className="channel-list-item"
            onClick={onSetCurrentChannel}
        >
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
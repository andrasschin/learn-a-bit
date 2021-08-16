import React from "react";
import "./ChannelItem.css";

const ChannelItem = props => {
    const { channelName, onDelete, onSetCurrentChannel } = props;
    return (
        <div 
            className="list-channel-item"
            onClick={onSetCurrentChannel}
        >
            {channelName} 
            <span 
                className="list-channel-item-remove-btn"
                onClick={onDelete}
            >
                <i className="far fa-minus-square"></i>
            </span>
        </div>
    )
}

export default ChannelItem;
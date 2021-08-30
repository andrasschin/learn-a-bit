import React, { Component } from "react";
import "./SummaryItem.css";

class SummaryItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showMore: false
        }

        this.onTextExpand = this.onTextExpand.bind(this);
    }

    render(){
        const { videoSource, videoTitle, createdAt, title, author, updoots, onUpdoot, currentUserId } = this.props;
        const { showMore } = this.state;
        let { text } = this.props;

        let updootedByUser = updoots.some(userId => {
            return userId === currentUserId
        });

        let dateCreatedAt = new Date(createdAt);
        let currentDate = Date.now();
        let diff = currentDate-dateCreatedAt;

        if (!showMore && text.length > 99) {
            text = text.slice(0, 99) + "...";
        }

        return (
            <div className="list-summary-item">
                <p className="list-summary-item-header">
                    <span className="list-summary-item-header-author">
                        {author + " "}
                    </span>
                    summarized a the Youtube video
                    <span className="list-summary-item-header-video-title">
                        {" " + videoTitle + " "}
                    </span>
                    from
                    <span className="list-summary-item-header-video-source">
                        {" " + videoSource + " "}
                    </span> 
                    {getDateDiffText(diff)}.
                </p>
                <p className="list-summary-item-title">{title}</p>
                <p className="list-summary-item-body">
                    {text}
                    { text.length > 99 ? 
                        <button 
                            className="btn-show-more"
                            onClick={this.onTextExpand}
                        >
                            { showMore ? "Show less" : "Show more" }
                        </button> :
                        null
                    }
                </p>
                <div className="list-summary-item-updoot">
                    { updootedByUser ? 
                        <button 
                            className="btn-updooted"
                            onClick={onUpdoot}
                        >
                            <i class="fas fa-heart"></i>
                        </button> :
                        <button 
                            className="btn-updoot"
                            onClick={onUpdoot}
                        >
                            <i class="far fa-heart"></i>
                            Updoot
                        </button>
                    }
                    <span className="updoot-count">
                        {updoots.length}
                    </span>
                </div>
            </div>
        )
    }

    onTextExpand(){
        this.setState(previousState => {
            return {
                showMore: !previousState.showMore
            }
        })
    }
}

function getDateDiffText(diffInMS){
    const MSinYears = 365*24*60*60*1000;
    const MSinDays = 24*60*60*1000;
    const MSinHours = 60*60*1000;
    const MSinMinutes = 60*1000;
    const MSinSeconds = 1000;
    
    if (diffInMS / MSinYears >= 2) return Math.floor(diffInMS / MSinYears) + " years ago";
    if (diffInMS / MSinYears >= 1) return Math.floor(diffInMS / MSinYears) + " year ago";
    
    if (diffInMS / MSinDays >= 2) return Math.floor(diffInMS / MSinDays) + " days ago";
    if (diffInMS / MSinDays >= 1) return Math.floor(diffInMS / MSinDays) + " day ago";
    
    if (diffInMS / MSinHours >=2) return Math.floor(diffInMS / MSinHours) + " hours ago";
    if (diffInMS / MSinHours >=1) return Math.floor(diffInMS / MSinHours) + " hour ago";
    
    if (diffInMS / MSinMinutes >= 2) return Math.floor(diffInMS / MSinMinutes) + " minutes ago";
    if (diffInMS / MSinMinutes >= 1) return Math.floor(diffInMS / MSinMinutes) + " minute ago";
    
    if (diffInMS / MSinSeconds >= 10) return Math.floor(diffInMS / MSinSeconds) + " seconds ago";
    if (diffInMS / MSinSeconds < 10 && diffInMS / MSinSeconds >= 1) return "just now";
    
    return -1;
}


export default SummaryItem;
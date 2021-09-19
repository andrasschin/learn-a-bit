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
        const currentSummaryId = this.props._id;
        const {
            videoSource, 
            videoTitle, 
            createdAt, 
            title, 
            authorName,
            updootsCount, 
            onUpdoot,
            onRemoveUpdoot, 
            updootedSummaries
        } = this.props;
        const { showMore } = this.state;
        let { text } = this.props;

        // * This approach won't refresh the component
        /* let updootedByUser = updoots.some(userId => {
            return userId === currentUserId
        }); */

        let updootedByUser = updootedSummaries.some(summaryId => {
            return summaryId._id === currentSummaryId
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
                        {authorName + " "}
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
                            onClick={onRemoveUpdoot}
                        >
                            <i className="fas fa-heart"></i>
                        </button> :
                        <button 
                            className="btn-updoot"
                            onClick={onUpdoot}
                        >
                            <i className="far fa-heart"></i>
                            Updoot
                        </button>
                    }
                    <span className="updoot-count">
                        {updootsCount}
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
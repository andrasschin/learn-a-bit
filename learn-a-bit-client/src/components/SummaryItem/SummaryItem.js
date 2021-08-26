import React from "react";
import "./SummaryItem.css";

const SummaryItem = props => {
    const { source, createdAt, title, text, author } = props;
    
    let dateCreatedAt = new Date(createdAt);
    let currentDate = Date.now();
    let diff = currentDate-dateCreatedAt;
    
    return (
        <div className="list-summary-item">
            <p className="list-summary-item-header">
                <span className="list-summary-item-header-author">
                    {author + " "}
                </span>
                summarized a Youtube video from
                <span className="list-summary-item-header-source">
                    {" " + source + " "}
                </span> 
                {getDateDiffText(diff)}.
            </p>
            <p className="list-summary-item-title">{title}</p>
            <p className="list-summary-item-body">{text}</p>
        </div>
    )
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
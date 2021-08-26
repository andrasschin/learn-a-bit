import React, { Component } from "react";
import "./UserSummaryItem.css";

class UserSummaryItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showText: false
        }

        this.onTextToggle = this.onTextToggle.bind(this);
    }

    render(){
        const { source, title, text, createdAt, onDelete } = this.props;
        const { showText } = this.state;

        let date = new Date(createdAt);
        let createdAtText = date.toLocaleDateString();
        
        return (
            <div
                className="list-user-summary-item"
            >
                <p
                    onClick={this.onTextToggle}
                >
                    <span 
                        className="list-user-summary-item-arrow"
                        style={{ color: showText ? "orange" : null}}
                    >
                        { showText ? 
                            <i className="fas fa-angle-up"></i>
                            :
                            <i className="fas fa-angle-down"></i>
                        }
                    </span>
                
                    <b>{title}</b>
                    
                    <span 
                        className="list-user-summary-item-remove-btn"
                        onClick={onDelete}
                    >
                        <i className="far fa-minus-square"></i>
                    </span>
                </p>
                { showText ? 
                    <div className="list-user-summary-item-body">
                        <p>{text}</p>
                        <hr/>
                        <p>Based on a video from <b>{source}</b></p>
                        <p><i>Written on {createdAtText}</i></p>
                    </div>
                    : null
                }
            </div>
        )
    }

    onTextToggle(){
        this.setState((previousState) => {
            return {
                showText: !previousState.showText
            }
        })
    }
}

export default UserSummaryItem;
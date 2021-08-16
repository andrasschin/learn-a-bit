import React, { Component } from "react";
import "./SummaryItem.css";

class SummaryItem extends Component {
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
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        /* let createdAtText = `${year}-${month}-${day}`; */
        let createdAtText = date.toLocaleDateString();
        
        return (
            <>
                <div
                    className="list-summary-item"
                >
                    <p
                        onClick={this.onTextToggle}
                    >
                        <span 
                            className="list-summary-item-arrow"
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
                            className="list-summary-item-remove-btn"
                            onClick={onDelete}
                        >
                            <i className="far fa-minus-square"></i>
                        </span>
                    </p>
                    { showText ? 
                        <div className="list-summary-item-body">
                            <p>{text}</p>
                            <hr/>
                            <p>Based on a video from <b>{source}</b></p>
                            <p><i>Written on {createdAtText}</i></p>
                        </div>
                        : null
                    }
                </div>
            </>
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

export default SummaryItem;
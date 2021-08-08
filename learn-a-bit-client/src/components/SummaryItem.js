import React, { Component } from "react";

class SummaryItem extends Component {
    constructor(props){
        super(props);

        this.state = {
            showText: false
        }

        this.onTextToggle = this.onTextToggle.bind(this);
    }

    render(){
        const { source, title, text, onDelete } = this.props;
        const { showText } = this.state;
        return (
            <>
                <div
                    className="summary-list-item"
                >
                    <p
                        onClick={this.onTextToggle}
                    >
                        <span 
                            className="summary-list-item-arrow"
                            style={{ color: showText ? "orange" : null}}
                        >
                            { showText ? 
                                <i className="fas fa-angle-up"></i>
                                :
                                <i className="fas fa-angle-down"></i>
                            }
                        </span>
                    
                        <b>{source}</b> - {title}
                        
                        <span 
                            className="summary-list-item-remove-btn"
                            onClick={onDelete}
                        >
                            <i className="far fa-minus-square"></i>
                        </span>
                    </p>
                    { showText ? 
                        <p className="summary-list-item-body"> {text} </p>
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
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
        const { source, title, text } = this.props;
        const { showText } = this.state;
        return (
            <>
                <div onClick={this.onTextToggle}>
                    <p><b>{source}</b> - {title}</p>
                    
                </div>
                { showText ? 
                    <p> {text} </p>
                    : null
                }
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
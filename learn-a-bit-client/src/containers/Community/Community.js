import React, { Component } from "react";
import "./Community.css";

import { connect } from "react-redux";
import { getSummaries } from "../../store/actions/summaries";

import SummaryItem from "../../components/SummaryItem/SummaryItem";

class Community extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }
    
    render(){
        const { summaries } = this.props;
        const { isLoading } = this.state;
        
        if (Array.isArray(summaries) && !isLoading) {
            const summariesList = summaries.map(summary => {
                return (
                    <SummaryItem
                        key={summary._id}
                        source={summary.source}
                        title={summary.title}
                        text={summary.text}
                        author={summary.author}
                        createdAt={summary.createdAt}
                    ></SummaryItem>
                )
            })
            return (
                <div className="hero-default hero-community">
                    <div className="container-default">
                        <h2>Community</h2>
                        <div className="list-items">
                            {summariesList.length === 0 ? 
                                <p>You don't have any summaries yet. :(</p> :
                                summariesList
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="hero-default hero-community">
                    <div className="container-default">
                        <h2>Community</h2>
                        <div className="loading-icon-container">
                            <div className="loading-icon"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getSummaries()
            .then(() => {
                this.setState({
                    isLoading: false
                })
            })
        }, 2000);
    }
}

function mapStateToProps(state){
    return {
        summaries: state.summaries
    }
}

export default connect(mapStateToProps, { getSummaries })(Community);

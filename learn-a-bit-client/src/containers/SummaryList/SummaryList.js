import React, { Component } from "react";
import "./SummaryList.css";
import { connect } from "react-redux";
import { getSummaries, deleteSummary } from "../../store/actions/summaries";

import withAuth from "../../hocs/withAuth";

import SummaryItem from "../../components/SummaryItem/SummaryItem";

class SummaryList extends Component {
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
            const summaryList = summaries.map(summary => {
                return (
                    <SummaryItem
                        key={summary._id}
                        source={summary.source}
                        title={summary.title}
                        text={summary.text}
                        createdAt={summary.createdAt}
                        onDelete={this.handleDelete.bind(this, summary._id)}
                    />
                )
            })

            return (
                <div className="hero-default summary-hero">
                    <div className="container-default">
                        <h2>Your Summaries</h2>
                        { summaryList.length === 0 ? 
                            <div className="list-items">
                                <p>You don't have any summaries yet. :(</p>
                            </div> 
                            :
                            <div className="list-items">
                                {summaryList}
                            </div>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <div className="hero-default hero-summary">
                    <div className="container-default">
                        <h2>Your Summaries</h2>
                        <div className="loading-icon-container">
                            <div className="loading-icon"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    componentDidMount(){
        this.props.getSummaries()
            .then(this.setState({
                isLoading: false
            }))  
    }

    handleDelete(id, event){
        event.stopPropagation();
        this.props.deleteSummary(id);
    }
}

function mapStateToProps(state){
    return {
        summaries: state.summaries
    }
}

export default withAuth(connect(mapStateToProps, { getSummaries, deleteSummary })(SummaryList));
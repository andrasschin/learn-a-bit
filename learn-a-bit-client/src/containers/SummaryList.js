import React, { Component } from "react";
import { connect } from "react-redux";
import { getSummaries, deleteSummary } from "../store/actions/summaries";

import withAuth from "../hocs/withAuth";

import SummaryItem from "../components/SummaryItem";

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
                        onDelete={this.handleDelete.bind(this, summary._id)}
                    />
                )
            })

            return (
                <div className="summary-hero">
                    <h2>Here are your summaries!</h2>
                    {summaryList}
                </div>
            )
        } else {
            return (
                <p>Loading...</p>
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
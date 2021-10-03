import React, { Component } from "react";
import "./UserSummaryList.css";
import { connect } from "react-redux";
import { getSummaries, deleteSummary } from "../../store/actions/userSummaries";
import { getUpdootedSummaries, postUpdootToSummary, deleteUpdootFromSummary, updateUpdootedSummaryWithUpdoot } from "../../store/actions/updootedSummaries";

import withAuth from "../../hocs/withAuth";

import SummaryItem from "../../components/SummaryItem/SummaryItem";
import UserSummaryItem from "../../components/UserSummaryItem/UserSummaryItem";

const TABS = {
    USER_SUMMARIES: "USER_SUMMARIES",
    UPDOOTED_SUMMARIES: "UPDOOTED_SUMMARIES"
}

class SummaryList extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            activeTab: ""
        }
    }

    render(){
        const { userSummaries, updootedSummaries } = this.props;
        const { isLoading, activeTab } = this.state;

        if (!isLoading) {
            let summaryList;

            if (activeTab === TABS.USER_SUMMARIES) {
                summaryList = userSummaries.map(summary => {
                    return (
                        <UserSummaryItem
                            key={summary._id}
                            {...summary}
                            onDelete={this.handleDelete.bind(this, summary._id)}
                        />
                    )
                })
            }
            else if (activeTab === TABS.UPDOOTED_SUMMARIES) {
                summaryList = updootedSummaries.map(uSummary => {
                    return (
                        <SummaryItem
                            key={uSummary._id}
                            {...uSummary}
                            updootedSummaries={updootedSummaries}
                            onUpdoot={this.handleUpdoot.bind(this, uSummary._id)}
                            onRemoveUpdoot={this.handleRemoveUpdoot.bind(this, uSummary._id)}
                        />
                    )
                })
            }
            else {
                summaryList = [];
            }

            return (
                <div className="hero-default hero-summary">
                    <div className="container-default container-user-summary">
                        <h2>Your Summaries</h2>
                        <div className="order-by-list">
                        <div className="order-list-by">
                                <button 
                                    className={`btn-order-by ${activeTab === TABS.USER_SUMMARIES ? "btn-order-by-active" : ""}`}
                                    onClick={this.handleTabChange.bind(this, TABS.USER_SUMMARIES)}
                                >
                                    My Summaries
                                </button>
                                <button 
                                    className={`btn-order-by ${activeTab === TABS.UPDOOTED_SUMMARIES ? "btn-order-by-active" : ""}`}
                                    onClick={this.handleTabChange.bind(this, TABS.UPDOOTED_SUMMARIES)}
                                >
                                    Updooted Summaries
                                </button>
                        </div>
                        <h3 className="results-counter">Results: {summaryList.length}</h3>
                        </div>
                        { summaryList.length === 0 ? 
                            <div className="list-items">
                                <p>Nothing here :-(</p>
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
                        <h2>Summaries</h2>
                        <div className="order-list-by">
                                <button 
                                    className={`btn-order-by ${activeTab === TABS.USER_SUMMARIES ? "btn-order-by-active" : ""}`}
                                    onClick={this.handleTabChange.bind(this, TABS.USER_SUMMARIES)}
                                >
                                    My Summaries
                                </button>
                                <button 
                                    className={`btn-order-by ${activeTab === TABS.UPDOOTED_SUMMARIES ? "btn-order-by-active" : ""}`}
                                    onClick={this.handleTabChange.bind(this, TABS.UPDOOTED_SUMMARIES)}
                                >
                                    Updooted Summaries
                                </button>
                        </div>
                        <div className="loading-icon-container">
                            <div className="loading-icon"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    componentDidMount(){
        this.handleTabChange(TABS.USER_SUMMARIES);
    }

    handleTabChange(tab){
        this.setState({
            activeTab: tab,
            isLoading: true
        })

        switch(tab) {
            case TABS.USER_SUMMARIES:
                this.props.getSummaries()
                    .then(() => {
                        this.setState({
                            isLoading: false
                        })
                    });
                break;

            case TABS.UPDOOTED_SUMMARIES:
                this.props.getUpdootedSummaries()
                    .then(() => {
                        this.setState({
                            isLoading: false
                        })
                    });
                break;

            default:
                console.log("Tab not found.")
        }
    }

    handleDelete(id, event){
        event.stopPropagation();
        this.props.deleteSummary(id);
    }
    
    handleUpdoot(id) {
        this.props.postUpdootToSummary(id, updateUpdootedSummaryWithUpdoot);
    }

    handleRemoveUpdoot(id) {
        this.props.deleteUpdootFromSummary(id, updateUpdootedSummaryWithUpdoot);
    }
}

function mapStateToProps(state){
    return {
        userSummaries: state.userSummaries,
        updootedSummaries: state.updootedSummaries,
        currentUser: state.currentUser
    }
}

export default withAuth(connect(mapStateToProps, { getSummaries, deleteSummary, getUpdootedSummaries, postUpdootToSummary, deleteUpdootFromSummary, updateUpdootedSummaryWithUpdoot })(SummaryList));
import React, { Component } from "react";
import "./Community.css";

import { connect } from "react-redux";
import { getSummaries, switchUpdootOnSummary } from "../../store/actions/summaries";

import SummaryItem from "../../components/SummaryItem/SummaryItem";

class Community extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }

        this.handleUpdoot = this.handleUpdoot.bind(this);
    }
    
    render(){
        const { summaries, currentUser } = this.props;
        const { isLoading } = this.state;
        const userId = currentUser.user.id;
        
        if (Array.isArray(summaries) && !isLoading) {
            const summariesList = summaries.map(summary => {
                return (
                    <SummaryItem
                        key={summary._id}
                        videoSource={summary.videoSource}
                        videoTitle={summary.videoTitle}
                        title={summary.title}
                        text={summary.text}
                        author={summary.author}
                        updoots={summary.updoots}
                        createdAt={summary.createdAt}
                        onUpdoot={this.handleUpdoot.bind(this, summary._id)}
                        currentUserId={userId}
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
        this.props.getSummaries()
            .then(() => {
                this.setState({
                    isLoading: false
                })
            });
    }

    handleUpdoot(id){
        this.props.switchUpdootOnSummary(id);
    }
}

function mapStateToProps(state){
    return {
        summaries: state.summaries,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { getSummaries, switchUpdootOnSummary })(Community);

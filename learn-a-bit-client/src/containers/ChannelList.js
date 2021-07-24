import React, { Component } from "react";
import { connect } from "react-redux";
import { getChannels, deleteChannel } from "../store/actions/channels";

import withAuth from "../hocs/withAuth";

import ChannelItem from "../components/ChannelItem";
import NewChannelForm from "./NewChannelForm";

class ChannelList extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true,
            showForm: false
        }

        this.onFormToggle = this.onFormToggle.bind(this);
    }
    
    render(){
        const { channels } = this.props;
        const { isLoading, showForm } = this.state;
        
        if (Array.isArray(channels) && !isLoading){
            const channelList = channels.map(channel => {
                return (
                    <ChannelItem 
                        key={channel._id}
                        channelId={channel.channelId}
                        channelName={channel.channelName}
                        onDelete={this.handleDelete.bind(this, channel._id)}
                    />
                )
            })
            return (
                <>
                    { channelList.length === 0 ? 
                        <>
                            <p>You don't have any channels :(</p>
                            <p>Make sure to add some!</p>
                        </>
                        : 
                        <>
                            <div className="channels-hero">
                                <h2>We have your channels!</h2>
                                { showForm ?
                                <>
                                    <button 
                                        className="btn btn-outline-danger"
                                        onClick={this.onFormToggle}    
                                    >
                                            <i className="fas fa-minus-circle"></i> Close form
                                    </button>
                                    <NewChannelForm 
                                        onFormToggle={this.onFormToggle}
                                    />
                                </>
                                : 
                                <>
                                    <button 
                                        className="btn btn-outline-warning"
                                        onClick={this.onFormToggle}    
                                    >
                                            <i className="fas fa-plus"></i> Add a channel
                                    </button>
                                    <div className="channel-list">
                                        {channelList}
                                    </div>
                                </>
                                }
                            </div>
                            
                        </>
                    }
                </>
            )
        }
        else {
            return (
                <p>Loading your channels...</p>
            )
        }
    }

    componentDidMount(){
        this.props.getChannels()
            .then(this.setState({ isLoading: false }))
    }

    onFormToggle(){
        this.setState(previousState => {
            return {
                ...previousState,
                showForm: !previousState.showForm
            }
        })
    }

    handleDelete(id){
        this.props.deleteChannel(id);
    }
}

function mapStateToProps(state){
    return {
        channels: state.channels
    }
}

export default withAuth(connect(mapStateToProps, { getChannels, deleteChannel })(ChannelList));
import React, { Component } from "react";
import "./ChannelList.css";
import { connect } from "react-redux";
import { getChannels, deleteChannel } from "../../store/actions/channels";
import { setCurrentChannel } from "../../store/actions/currentChannel";

import withAuth from "../../hocs/withAuth";

import ChannelItem from "../../components/ChannelItem/ChannelItem";
import NewChannelForm from "../NewChannelForm/NewChannelForm";

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
                        onSetCurrentChannel={this.handleSetCurrentChannel.bind(this, channel)}
                    />
                )
            })
            return (
                <div className="hero-default channels-hero">
                    <div className="container-default container-channels">
                        { showForm ?
                            <>
                                <div>
                                    <button 
                                        className="btn-switch btn-close-form"
                                        onClick={this.onFormToggle}    
                                    >
                                        <i className="fas fa-minus-circle"></i> Close form
                                    </button>
                                </div>

                                <h2>Add a channel</h2>
                                
                                <NewChannelForm 
                                    onFormToggle={this.onFormToggle}
                                />
                            </>
                        : 
                            <>
                                <div>
                                    <button 
                                        className="btn-switch btn-add"
                                        onClick={this.onFormToggle}    
                                    >
                                        <i className="fas fa-plus"></i> Add a channel
                                    </button>
                                </div>
                                
                                <h2>Your channels</h2>

                                { channelList.length === 0 ? 
                                    <div className="list-items">
                                        <p>You don't have any channels yet. :(</p>
                                    </div> 
                                    :
                                    <div className="list-items list-channel-items">
                                    {channelList}
                                </div>   
                                }
                            </>
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="hero-default channels-hero">
                    <div className="container-default container-channels">
                        <div>
                            <button 
                                className="btn-switch btn-add"
                                onClick={this.onFormToggle}    
                            >
                                <i className="fas fa-plus"></i> Add a channel
                            </button>
                            
                            <h2>Your channels</h2>

                            <div className="loading-icon-container">
                                <div className="loading-icon"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getChannels()
            .then(this.setState({ isLoading: false }))
            .catch(err => console.log(err));
        }, 1500);
    }

    onFormToggle(){
        this.setState(previousState => {
            return {
                ...previousState,
                showForm: !previousState.showForm
            }
        })
    }

    handleDelete(id, event){
        event.stopPropagation();
        this.props.deleteChannel(id);
    }

    handleSetCurrentChannel(channel){
        this.props.setCurrentChannel(channel);
        this.props.history.push("/video");
    }
}

function mapStateToProps(state){
    return {
        channels: state.channels
    }
}

export default withAuth(connect(mapStateToProps, { getChannels, deleteChannel, setCurrentChannel })(ChannelList));
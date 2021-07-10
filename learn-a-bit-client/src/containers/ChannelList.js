import React, { Component } from "react";
import { connect } from "react-redux";
import { getChannels } from "../store/actions/channels";
import ChannelItem from "../components/ChannelItem";

class ChannelList extends Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }
    
    render(){
        const { channels } = this.props;
        const { isLoading } = this.state;
        
        if (!isLoading){
            const channelList = channels.map(channel => {
                return (
                    <ChannelItem 
                        key={channel._id}
                        channelId={channel.channelId}
                        channelName={channel.channelName}
                    />
                )
            })
            return (
                <div>
                    <h2>We have your channels!</h2>
                    {channelList}
                </div>
            )
        } else {
            return (
                <p>Loading your channels...</p>
            )
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.props.getChannels()
                .then(this.setState({isLoading: false}))
        }, 1000)
    }
}

function mapStateToProps(state){
    return {
        channels: state.channels
    }
}

export default connect(mapStateToProps, { getChannels })(ChannelList);
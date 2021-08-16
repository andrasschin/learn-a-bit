import React, { Component } from 'react';
import "./NewChannelForm.css";
import { connect } from 'react-redux';
import { postChannel } from '../../store/actions/channels';

class NewChannelForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            channelNameInput: "",
            channelIdInput: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNewChannel = this.handleNewChannel.bind(this);
    }

    render(){
        const { channelNameInput, channelIdInput } = this.state;
        return (
            <form 
                onSubmit={this.handleNewChannel}
                autoComplete="off"
                className="new-channel-form"
            >
                <div>
                    <label 
                        className="form-label"
                        htmlFor="channelNameInput"
                    >
                        Name:
                    </label>
                    <input 
                        className="form-control"
                        type="text"
                        id="channelNameInput"
                        name="channelNameInput"
                        value={channelNameInput}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <label 
                        className="form-label"
                        htmlFor="channelIdInput"
                    >
                        The channel's Youtube ID:
                    </label>
                    <input
                        className="form-control"
                        type="text"
                        id="channelIdInput"
                        name="channelIdInput"
                        value={channelIdInput}
                        onChange={this.handleChange}
                    />
                </div>
                <div>
                    <button 
                        className="btn submit-btn"
                    >
                        Save
                    </button>
                </div>
            </form>
        )
    }

    handleNewChannel(e){
        e.preventDefault();
        this.props.postChannel({
            channelName: this.state.channelNameInput,
            channelId: this.state.channelIdInput
        });

        this.props.onFormToggle();
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }
}

export default connect(null, { postChannel })(NewChannelForm);
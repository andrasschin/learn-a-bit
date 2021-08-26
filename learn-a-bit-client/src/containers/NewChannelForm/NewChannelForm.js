import React, { Component } from 'react';
import "./NewChannelForm.css";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { postChannel } from '../../store/actions/channels';
import { addError, removeError } from "../../store/actions/errors";

class NewChannelForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            channelNameInput: "",
            channelIdInput: "",
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleNewChannel = this.handleNewChannel.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
    }

    render(){
        const { channelNameInput, channelIdInput, isLoading } = this.state;
        const { history, errors, removeError, addError } = this.props;

        history.listen(() => {
            removeError();
        })

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
                        { isLoading ? 
                            <button 
                                className="btn-submit-default btn-submit-saving disabled"
                            >
                                Saving...
                            </button> :
                            <button 
                                className="btn-submit-default"
                            >
                                Save
                            </button>
                        }
                </div>
                { errors.message ? 
                    <div className="alert alert-danger">{errors.message}</div> 
                    : null
                }
            </form>
        )
    }

    handleNewChannel(e){
        e.preventDefault();
        if (this.checkInputs()){
            this.setState({
                isLoading: true
            });

            setTimeout(() => {
                this.props.postChannel({
                    channelName: this.state.channelNameInput,
                    channelId: this.state.channelIdInput
                })
                    .then(() => {
                        this.props.onFormToggle();
                    })
            }, 2000);
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    checkInputs(){
        const { channelNameInput, channelIdInput } = this.state;
        if (channelNameInput === "" || channelIdInput === "") {
            console.log("HI");
            this.props.addError("Please fill out each input.");
            return false;
        }
        return true;
    }
}

function mapStateToProps(state){
    return {
        errors: state.errors
    }
}

export default withRouter(connect(mapStateToProps, { postChannel, addError, removeError })(NewChannelForm));
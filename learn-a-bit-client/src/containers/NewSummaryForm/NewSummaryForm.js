import React, { Component } from "react";
import "./NewSummaryForm.css";

import { connect } from "react-redux";
import withAuth from "../../hocs/withAuth";
import { postSummary } from "../../store/actions/summaries";
import { addError, removeError } from "../../store/actions/errors";
import { withRouter } from "react-router-dom";

class NewSummaryForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            titleInput: "",
            textInput: ""
        }

        this.handleNewSummary = this.handleNewSummary.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
    }

    render(){
        const { titleInput, textInput } = this.state;
        const { sourceChannel, videoTitle, history, errors, addError, removeError } = this.props;

        history.listen(() => {
            removeError();
        })

        return (
            <form 
                className="summary-form"
                onSubmit={this.handleNewSummary}
            >
                <h3>Now write down what you just learned!</h3>
                
                <div className="mb-3">
                    <label 
                        htmlFor="sourceInput"
                        className="form-label"
                    >
                        Source channel
                    </label>
                    <input 
                        type="text" 
                        id="sourceInput"
                        value={sourceChannel}
                        className="form-control"
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label 
                        htmlFor="videoTitleInput"
                        className="form-label"
                    >
                        Video title
                    </label>
                    <input 
                        type="text" 
                        id="videoTitleInput"
                        value={videoTitle}
                        className="form-control"
                        disabled
                    />
                </div>

                <div className="mb-3">
                    <label 
                        htmlFor="titleInput"
                        className="form-label"
                    >
                        Title
                    </label>
                    <input 
                        type="text" 
                        id="titleInput"
                        name="titleInput"
                        className="form-control"
                        value={titleInput}
                        onChange={this.handleChange}
                    />
                    <div className="form-text">Be creative... or don't.</div>
                </div>

                <div className="mb-3">
                    <label 
                        htmlFor="textInput"
                        className="form-label"
                    >
                        Body
                    </label>
                    <textarea 
                        type="text" 
                        id="textInput"
                        name="textInput"
                        rows="7"
                        className="form-control"
                        value={textInput}
                        onChange={this.handleChange}
                    />
                    <div className="form-text">Don't spare any words! :)</div>
                </div>

                <div className="text-center">
                    <button 
                        type="submit"
                        className="btn-submit-default"
                    >
                        I've just learned something!
                    </button>
                </div>

                { errors.message ? 
                    <div className="alert alert-danger text-center mt-4">
                        {errors.message}
                    </div> 
                    : null
                }
            </form>
        )
    }

    handleNewSummary(e){
        e.preventDefault();

        if (this.checkInputs()){
            const { titleInput, textInput } = this.state;
            const { sourceChannel } = this.props;
            this.props.postSummary({
                source: sourceChannel,
                title: titleInput,
                text: textInput
            });
        }
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    checkInputs(){
        const { titleInput, textInput } = this.state;
        if (titleInput === "" || textInput === ""){
            this.props.addError("Please fill out all inputs.");
            return false;
        }
        return true;
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default withAuth(withRouter(connect(mapStateToProps, { postSummary, addError, removeError })(NewSummaryForm)));
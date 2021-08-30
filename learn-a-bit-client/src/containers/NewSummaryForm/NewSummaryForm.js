import React, { Component } from "react";
import "./NewSummaryForm.css";

import { connect } from "react-redux";
import withAuth from "../../hocs/withAuth";
import { postSummary } from "../../store/actions/userSummaries";
import { addError, removeError } from "../../store/actions/errors";
import { withRouter } from "react-router-dom";

class NewSummaryForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            titleInput: "",
            textInput: "",
            isLoading: false
        }

        this.handleNewSummary = this.handleNewSummary.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
    }

    render(){
        const { titleInput, textInput, isLoading } = this.state;
        const { videoSource, videoTitle, history, errors, addError, removeError } = this.props;

        history.listen(() => {
            removeError();
        })

        return (
            <form
                autoComplete="off"
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
                        value={videoSource}
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
                { isLoading ? 
                            <button
                                className="btn-default btn-submit-default btn-submit-saving disabled"
                            >
                                Saving...
                            </button> :
                            <button 
                                className="btn-default btn-submit-default"
                            >
                                Save
                            </button>
                        }
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
            const { videoSource, videoTitle, history } = this.props;
            
            this.setState({
                isLoading: true
            });

            this.props.postSummary({
                videoSource,
                videoTitle,
                title: titleInput,
                text: textInput
            })
                .then(() => {
                    history.push("/summaries");
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
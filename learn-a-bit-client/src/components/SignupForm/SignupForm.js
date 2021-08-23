import React, { Component } from 'react';
import "./SignupForm.css";

class SignupForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            usernameInput: "",
            passwordInput: "",
            confirmPasswordInput: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render(){
        const { usernameInput, passwordInput, confirmPasswordInput } = this.state;
        const { errors, removeError, history} = this.props;

        history.listen(() => {
            removeError();
        })

        return (
            <div className="container-fluid auth-hero hero-signup">
                <form
                    autoComplete="off"
                    className="auth-form"
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <h1>Sign up</h1>
                    </div>

                    <div>
                        <label
                            htmlFor="usernameInput"
                            className="form-label"
                        >
                             Username:
                        </label>
                        <input 
                            type="text" 
                            name="usernameInput"
                            id="usernameInput"
                            className="form-control"
                            value={usernameInput}
                            onChange={this.handleChange}
                        />
                    </div>
        
                    <div>
                        <label 
                            htmlFor="passwordInput"
                            className="form-label"
                        >
                            Password:
                        </label>
                        <input 
                            type="password" 
                            name="passwordInput"
                            id="passwordInput"
                            className="form-control"
                            value={passwordInput} 
                            onChange={this.handleChange}
                        />
                    </div>
        
                    <div>
                        <label 
                            htmlFor="confirmPasswordInput"
                            className="form-label"
                        >
                            Confirm password:
                        </label>
                        <input 
                            type="password" 
                            name="confirmPasswordInput"
                            id="confirmPasswordInput"
                            className="form-control"
                            value={confirmPasswordInput}
                            onChange={this.handleChange}
                        />
                    </div>
        
                    <div>
                        <button 
                            type="submit"
                            className="btn submit-btn signup-btn"
                        >
                            Sign up!
                        </button>
                    </div>
                    { errors.message ? 
                        <div className="alert alert-danger">{errors.message}</div>
                        : null    
                    }
                </form>
            </div>
        )
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSubmit(e){
        e.preventDefault();
        if (this.state.passwordInput === this.state.confirmPasswordInput){
            let userData = {
                username: this.state.usernameInput,
                password: this.state.passwordInput
            }
            
            this.props.onSignUp(userData)
                .then(() => {
                    this.props.history.push("/")
                })
                .catch(() => {
                    return;
                })
        } else {
            this.props.addError("Passwords must match!");
        }
    }
}

export default SignupForm;
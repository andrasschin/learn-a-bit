import React, { Component } from 'react';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="usernameInput">Username:</label>
                    <input 
                        type="text" 
                        name="usernameInput"
                        value={usernameInput}
                        onChange={this.handleChange}
                    />
        
                    <label htmlFor="passwordInput">Password:</label>
                    <input 
                        type="password" 
                        name="passwordInput"
                        value={passwordInput} 
                        onChange={this.handleChange}
                    />
        
                    <label htmlFor="confirmPasswordInput">Confirm password:</label>
                    <input 
                        type="password" 
                        name="confirmPasswordInput"
                        value={confirmPasswordInput}
                        onChange={this.handleChange}
                    />
        
                    <button type="submit">Sign up!</button>
                </form>
                { errors.message ? 
                    <div className="alert alert-danger">{errors.message}</div>
                    : null    
                }
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
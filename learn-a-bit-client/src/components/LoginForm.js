import React, { Component } from 'react';

class LoginForm extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            usernameInput: "",
            passwordInput: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    render(){
        const { usernameInput, passwordInput } = this.state;
        const { errors, removeError, history } = this.props;

        history.listen(() => {
            removeError();
        })

        /*
        * To be fixed: label's htmlFor should match input's id not name property.
        */
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
                    
                    <button type="submit">Login</button>
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

    handleSubmit(event){
        event.preventDefault();
        let userData = {
            username: this.state.usernameInput,
            password: this.state.passwordInput
        }
        this.props.onAuth(userData)
            .then(() => {
                this.props.history.push("/")
            })
            .catch(() => {
                return;
            });
    }
}

export default LoginForm;
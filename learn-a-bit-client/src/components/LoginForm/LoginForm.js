import React, { Component } from 'react';
import "./LoginForm.css"

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

        return (
            <div className="container-fluid auth-hero login-hero">
                
                <form
                    autoComplete="off"
                    className="auth-form"
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        <h1>Login</h1>
                    </div>
                    
                    <div>
                        <label
                            className="form-label"
                            htmlFor="usernameInput"
                        >
                                Username:
                        </label>
                        <input
                            className="form-control"
                            type="text" 
                            name="usernameInput"
                            id="usernameInput"
                            value={usernameInput}
                            onChange={this.handleChange}
                        />
                    </div>
                    
                    <div>
                        <label 
                            className="form-label"
                            htmlFor="passwordInput"
                        >
                            Password:
                        </label>
                        <input
                            className="form-control" 
                            type="password" 
                            name="passwordInput"
                            id="passwordInput"
                            value={passwordInput}
                            onChange={this.handleChange}
                        />
                    </div>
                    
                    <div>
                        <button 
                            type="submit"
                            className="btn submit-btn login-btn"
                        >
                            Login
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
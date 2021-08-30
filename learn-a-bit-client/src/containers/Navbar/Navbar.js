import React, { Component } from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/auth';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    render(){
        const { currentUser } = this.props;
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Learn a Bit</Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div 
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                    
                    { !currentUser.isAuthenticated ? 
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link 
                                    to="/signin"
                                    className="nav-link"
                                >
                                    Log in
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/signup"
                                    className="nav-link"
                                >
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                        :
                        <>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link
                                        to="/channels"
                                        className="nav-link"
                                    >
                                        Channels
                                    </Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link
                                        to="/summaries"
                                        className="nav-link"
                                    >
                                        Summaries
                                    </Link>
                                </li>
                                
                                <li className="nav-item">
                                    <Link
                                        to="/community"
                                        className="nav-link"
                                    >
                                        Community
                                    </Link>
                                </li>
                            </ul>
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link 
                                        to="/logout"
                                        className="nav-link"
                                        onClick={this.logout}
                                    >
                                        Log out from account {currentUser.user.username}
                                    </Link>
                                </li>
                            </ul>
                        </>
                }
                    </div>
                </div>
            </nav>
        )
    }

    logout(e) {
        e.preventDefault();
        this.props.logoutUser();
        this.props.history.push("/");
    }
    
}

export default connect(null, { logoutUser })(Navbar);
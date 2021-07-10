import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../store/actions/auth';

class Navbar extends Component {
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }

    render(){
        const { currentUser } = this.props;
        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">Learn a Bit</Link>
                { !currentUser.isAuthenticated ? 
                    <div className="ms-auto">
                        <Link to="/signin">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                    : 
                    <>
                        <Link
                            to="/channels"
                        >
                            Channels
                        </Link>

                        <Link
                            to="/summaries"
                        >
                            Summaries
                        </Link>

                        <Link
                            to="/community"
                        >
                            Community
                        </Link>

                        <Link 
                            to="/logout" 
                            className="ms-auto"
                            onClick={this.logout}
                        >
                            Log out from account {currentUser.user.username}
                        </Link>
                    </>
                }
                
            </nav>
        )
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }
    
}

export default connect(null, { logout })(Navbar);
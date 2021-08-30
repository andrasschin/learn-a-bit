import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = (props) => {
    const { currentUser } = props;
    return (
        <div className="home-hero">
            <div className="home-item">
            { !currentUser.isAuthenticated ? 
                <>
                    <h1>Hi there!</h1>
                    <p>Learn interesting things from Youtube every day and make them stick!</p>
                    <div>
                        <Link 
                            className="btn-default link-to-signup"
                            to="/signup"
                        >
                            Get started!
                        </Link>
                    </div>
                </>
                : 
                <>
                    <h1>Hi, <b>{currentUser.user.username}.</b></h1>
                    <h3>Good to see you back!</h3>
                    <p>What are you up to today?</p>
                    <div>
                        <Link
                            className="btn-default link-to-channels"
                            to="/channels"
                        >
                                Learn a bit quickly
                        </Link>
                    </div>
                    <div className="delayed-animation">
                        <Link
                            className="btn-default link-to-community"
                            to="/community"
                        >
                                What are others up to?
                        </Link>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

export default Homepage;
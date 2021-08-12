import React from 'react';
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
                    <button className="btn btn-signup">Get started!</button>
                </>
                : 
                <>
                    <h1>Hi, <b>{currentUser.user.username}.</b></h1>
                    <h3>Good to see you back!</h3>
                    <p>What are you up to today?</p>
                    <button
                        className="btn btn-labq">
                            Learn a bit quickly
                    </button>
                    <button
                        className="btn btn-waout">
                            What are others up to?
                    </button>
                </>
            }
            </div>
        </div>
    )
}

export default Homepage;
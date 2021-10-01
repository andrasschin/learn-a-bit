import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = (props) => {
    const { currentUser } = props;
    return (
        <div className="home-main">
            { currentUser.isAuthenticated ? 
                <h1>Welcome back, <span className="current-user-username">{currentUser.user.username}</span>.</h1> :

                <div className="container-navigation-buttons">
                    <Link 
                        to="/signin"
                        className="btn-default link-to-signin"
                    >
                            Log in
                    </Link>
                    <Link 
                        to="/signup"
                        className="btn-default link-to-signup"
                    >
                        Sign up
                    </Link>
                </div>
            }

            <div className="presentation-row">
                <div className="presentation-item presentation-short">
                    <p>Add a Youtube channel.</p>
                </div>
                <div className="presentation-item presentation-long">
                    <p>With just a Youtube ID, you can easily add a Youtube channel of your choosing. (Find Youtube channel ID's <a href="https://commentpicker.com/youtube-channel-id.php">here</a>)</p>
                </div>
            </div>

            <div className="presentation-row">
                <div className="presentation-item presentation-long">
                    <p>Selecting a channel from your list will show you a random video from that channel.</p>
                </div>
                <div className="presentation-item presentation-short">
                    <p>Watch a video.</p>
                </div>
            </div>

            <div className="presentation-row">
                <div className="presentation-item presentation-short">
                    <p>Submit your summary.</p>
                </div>
                <div className="presentation-item presentation-long">
                    <p>After watching the video you should try to summarize what you have previously seen. By doing this you will pay more attention to the video and will remember the contents better.</p>
                </div>
            </div>

            <div className="presentation-row">
                <div className="presentation-item presentation-long">
                    <p>Maybe compare your own writing with other's on the same video or check out your friend's summaries.</p>
                </div>
                <div className="presentation-item presentation-short">
                    <p>Check out others.</p>
                </div>
            </div>

            <div className="footer">
                <p>Check out the project on <a href="https://github.com/itsmeeandrew/learn-a-bit">GitHub</a>.</p>
            </div>

        </div>
    )
}

export default Homepage;
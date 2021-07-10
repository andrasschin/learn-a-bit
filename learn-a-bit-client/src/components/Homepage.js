import React from 'react';

const Homepage = (props) => {
    const { currentUser } = props;
    return (
        <div className="home-hero">
            { !currentUser.isAuthenticated ? 
                <>
                    <h1>Welcome to the site!</h1>
                    <h4>SIGN UP and Make Yourself better a little bit every day!</h4>
                </>
                : 
                <>
                    <h1>Good to see you back {currentUser.user.username} !</h1>
                    <h4>Hope you have a very nice day! :)</h4>
                </>
            }
        </div>
    )
}

export default Homepage;
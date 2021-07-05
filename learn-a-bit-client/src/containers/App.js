import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Navbar from './Navbar';
import Main from './Main';

const App = (props) => {
    const { currentUser, history } = props;
    return (
        <div>
            <Navbar history={history} currentUser={currentUser} />
            <Main />
        </div>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(App));

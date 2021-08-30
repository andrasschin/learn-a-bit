import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Navbar from './Navbar/Navbar';
import Main from './Main';

const App = (props) => {
    const { currentUser, history } = props;
    return (
        <>
            <Navbar history={history} currentUser={currentUser} />
            <Main />
        </>
    )
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    }
}

export default withRouter(connect(mapStateToProps, null)(App));

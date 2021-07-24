import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withAuth(ComponentToBeRendered){
    class Authenticate extends Component {
        render(){
            const { isAuthenticated } = this.props;
            if (!isAuthenticated){
                return <Redirect to="/signin" />
            }
            return <ComponentToBeRendered {...this.props} />
        }
    }

    function mapStateToProps(state){
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }
    
    return connect(mapStateToProps, null)(Authenticate)
}
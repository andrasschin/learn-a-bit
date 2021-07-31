import React from "react";

import { Route, Switch, withRouter } from "react-router";
import { connect } from "react-redux";

import { authUser, signUpUser } from "../store/actions/auth";
import { addError, removeError } from "../store/actions/errors";

import Homepage from "../components/Homepage";
import ChannelList from "./ChannelList";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Video from "../containers/Video";
import SummaryList from "./SummaryList";

const Main = (props) => {
    const { authUser, signUpUser, currentUser, errors, addError, removeError } = props;
    
    return (
        <Switch>
            <Route 
                exact path="/" 
                render={() => {
                    return (
                        <Homepage 
                            currentUser={currentUser}
                        />
                    )
                }}
            />
            <Route
                exact path="/channels"
                component={ChannelList}
            />
            <Route
                exact path="/summaries"
                component={SummaryList}
            />
            <Route
                exact path="/video"
                render={() => {
                    return (
                        <Video
                            currentUser={currentUser}
                        />
                    )
                }}
            />
            <Route 
                exact path="/signup" 
                render={(props) => {
                    return (
                        <SignupForm
                            {...props}
                            onSignUp={signUpUser}
                            errors={errors}
                            addError={addError}
                            removeError={removeError}
                        />
                    )
                }} 
            />
            <Route 
                exact path="/signin" 
                render={(props) => {
                    return (
                        <LoginForm 
                            {...props} 
                            onAuth={authUser} 
                            errors={errors}
                            removeError={removeError}
                        />
                    )
                }}
            />
            <Route path="*" component={() => "404 NOT FOUND"}/>
        </Switch>
    );
};

function mapStateToProps(state){
    return {
        errors: state.errors,
        currentUser: state.currentUser
    }
}

export default withRouter(
    connect(mapStateToProps, 
        { 
            authUser, 
            signUpUser,
            addError,
            removeError
        }
    )(Main)
);

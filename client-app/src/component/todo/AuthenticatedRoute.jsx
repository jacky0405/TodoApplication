import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

function AuthenticatedRoute(props) {

    if(AuthenticationService.isUserLogin()){
        return (
            <Route {...props}/>
        )
    }else {
        return(
            <Redirect to="/login"/>
        )
    }
}

export default AuthenticatedRoute;
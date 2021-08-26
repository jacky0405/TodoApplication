import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import AuthenticationService from './AuthenticationService.js';

function HeaderComponent(){

    const isUserLogIn = AuthenticationService.isUserLogin();
    console.log(isUserLogIn);


    return(
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="https://www.google.com/?hl=zh_tw" className="navbar-brand">jacky</a></div>
                <ul className="navbar-nav">
                    {isUserLogIn && <li><Link className="nav-link" to="/welcome/jacky">Home</Link></li>}
                    {isUserLogIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {!isUserLogIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isUserLogIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
            </nav>
        </header>
    )
}

export default withRouter(HeaderComponent);
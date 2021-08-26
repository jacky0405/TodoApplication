import React from 'react';
import '../../App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import HeaderComponent from './HeaderComponent';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import LoginComponent from './LoginComponent.jsx';
import ListTodoComponent from './ListTodoComponent.jsx';
import LogoutComponent from './LogoutComponent.jsx';
import FooterComponent from './FooterComponent.jsx';
import WelcomeComponent from './WelcomeComponent.jsx';
import ErrorComonent from './ErrorComonent.jsx';
import TodoComponent from './TodoComponent';

function TodoApp() {

    return (
        <div className="App">
            <BrowserRouter>
                <HeaderComponent/>
                <Switch>
                    <Route path="/" exact component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent}/>
                    <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                    <AuthenticatedRoute path="/todos" component={ListTodoComponent}/>
                    <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                    <Route component={ErrorComonent}/>
                </Switch>
                <FooterComponent/>
            </BrowserRouter>
        </div>

    )
}

export default TodoApp;
import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorldService.js';

function WelcomeComponent(props){

    const [welcomeMessage, setWelcomeMessage] = useState();

    const retrieveWelcomeMessage = () => {
        // HelloWorldService.executeHelloWorldService()
        // .then(res => setWelcomeMessage(res.data));
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(res => {console.log(res.data.message);setWelcomeMessage(res.data.message)});
        HelloWorldService.executeHelloWorldPathService(props.match.params.name)
        .then(res => {setWelcomeMessage(res.data.message)})
        .catch(error => {handleError(error)});
    }

    const handleError = (error) => {
        console.log(error.response);
        let errorMessage = '';
        if(error.message){
            errorMessage += error.message;
        }
    
        if(error.message && error.response){
            errorMessage += error.response.data.message;
        }
        setWelcomeMessage(errorMessage);

    }

    return (
        <div>
            <h1>Welcome!</h1>
            <div className="container">
                <p>Welcome to {props.match.params.name}'s world</p>
                <p>You can manage your todos <Link to="/todos">here</Link></p>
            </div>
            <div className="container">
                Click here to get welcome message.
                <button onClick={retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
            </div>
            <div className="container">
                {welcomeMessage}
            </div>
        </div>
    );

}

export default WelcomeComponent;
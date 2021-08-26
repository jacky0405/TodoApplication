import React, { useState }  from 'react';
import AuthenticationService from './AuthenticationService.js';

function LoginComponent(props) {

    const [username, setUsername] = useState("jackyhaha");
    const [password, setPassword] = useState("");
    const [hasLogin, setHasLogin] = useState();

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }

    const handlePassWord = (e) => {
        setPassword(e.target.value);
    }

    const loginClicked = () => {
        // jacky, 123
        // if(userName === "jacky" && passWord === "123"){
        //     AuthenticationService.registerSuccessfulLogin(userName, passWord);
        //     props.history.push(`/welcome/${userName}`);
        // } else{
        //     setHasLogin(0);
        // }

        // AuthenticationService.executeBasicAuthenticationService(username, password)
        //     .then( () => {
        //         AuthenticationService.registerSuccessfulLogin(username, password);
        //         props.history.push(`/welcome/${username}`);
        //     }).catch( () => {
        //         setHasLogin(0);
        //     })

        AuthenticationService.executeJwtAuthenticationService(username, password)
        .then( (res) => {
            AuthenticationService.registerSuccessfulLoginForJwt(username, res.data.token);
            props.history.push(`/welcome/${username}`);
        }).catch( () => {
            setHasLogin(0);
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="container">
                <ShowLoginMessage hasLogin={hasLogin}/>
                User Name: <input type="text" name="username" value={username} onChange={(e) =>handleUserName(e)}></input><br/>
                Password: <input type="password" name="password" value={password} onChange={(e) => handlePassWord(e)}></input><br/>
                <button className="btn" onClick={loginClicked}>Login</button>
            </div>
        </div>
    )
}

function ShowLoginMessage(props){
    if(props.hasLogin === 1){
        return(
            <div >Successful</div>
        )
    } else if(props.hasLogin === 0){
        return (
            <div className="alert alert-warning">Invaild</div>
        );
    }
    return null;
}

export default LoginComponent;
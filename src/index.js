import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter, Route, NavLink } from "react-router-dom";
import App from "./pages/App";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import logo from './logo.svg';
import './App.css';
import registerServiceWorker from './registerServiceWorker';
import './utils';
import './utils.css';

ReactDOM.render(
    <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
            </p>
            <HashRouter>
                <div>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/login">Login</NavLink>
                    <NavLink to="/register">Register</NavLink>

                    <Route exact  path="/" component={App}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </div>
            </HashRouter>
        </div>
        <div id="snackbar">Some text some message..</div>
    </div>,
    document.getElementById('root'));
registerServiceWorker();

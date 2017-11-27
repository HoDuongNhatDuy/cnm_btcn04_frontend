import React from "react";
import { HashRouter, Route, NavLink } from "react-router-dom";
import Util from '../../utils';
import '../../utils.css';

export default class Login extends React.Component {
    render() {
        // Util.showSnackBar("abc");
        return (
            <div className="container">
                <h2>Login</h2>
                <form className="form-horizontal">
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="username">Username:</label>
                        <div className="col-sm-4">
                            <input type="text" className="form-control" id="username" placeholder="Enter username" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2" htmlFor="pwd">Password:</label>
                        <div className="col-sm-4">
                            <input type="password" className="form-control" id="pwd" placeholder="Enter password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <HashRouter>
                            <div>
                                <NavLink to="/register">Register</NavLink>
                            </div>
                        </HashRouter>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-4 col-sm-4">
                            <button type="button" className="btn btn-default">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
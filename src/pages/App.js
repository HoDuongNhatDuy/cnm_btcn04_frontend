import React from "react";
import { Redirect } from 'react-router-dom'
export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);

        let user_id = document.cookie.user_id;
        this.state = {
            user_id: user_id
        };
    }
    render() {
        if (!this.state.user_id)
            return (
                <Redirect to="/login" push />
            );
        return (
            <div>
                <h1>MyWallet</h1>
            </div>
        );
    }
}
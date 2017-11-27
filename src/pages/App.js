import React from "react";
import { Redirect } from 'react-router-dom'
export default class MyWallet extends React.Component {
    render() {
        return (
            <div>
                {/*<Redirect to="/auth" push />*/}
                <h1>MyWallet</h1>
            </div>
        );
    }
}
import React from "react";
import {HashRouter, NavLink} from 'react-router-dom'

export default class WalletList extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let wallets = this.props.wallets.map((wallet, index) => {
            return (
                <p>
                    <NavLink to={`/wallet/${wallet._id}`}>{wallet.name}</NavLink>
                </p>
            );
        });
        return (
            <div>
                <HashRouter>
                    <div>
                        <p>
                            <NavLink to="/">Dashboard</NavLink>
                        </p>
                        {wallets}
                    </div>
                </HashRouter>
            </div>
        );
    }
}
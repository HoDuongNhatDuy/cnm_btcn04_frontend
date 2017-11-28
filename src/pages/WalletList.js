import React from "react";
import {HashRouter, NavLink} from 'react-router-dom'
import './WalletList.css';

export default class WalletList extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let wallets = this.props.wallets.map((wallet, index) => {
            return (
                <p key={wallet.name + "-" + index}>
                    <NavLink className="btn btn-success wallet-item" activeClassName='active' to={`/wallet/${wallet._id}`}>
                        <div className="row">
                            <div className="col-sm-6">
                                {wallet.name}
                            </div>
                            <div className="col-sm-6">
                                {wallet.amount}
                            </div>
                        </div>
                    </NavLink>
                </p>
            );
        });
        return (
            <div>
                <HashRouter>
                    <div>
                        <p>
                            <NavLink className="btn btn-info wallet-item dashboard" activeClassName='active' to="/">Dashboard</NavLink>
                        </p>
                        {wallets}
                    </div>
                </HashRouter>
            </div>
        );
    }
}
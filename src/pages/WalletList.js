import React from "react";
import {HashRouter, NavLink} from 'react-router-dom'
import './WalletList.css';
import CreateWalletModal from './CreateWalletModal';

export default class WalletList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let this_component = this;
        let wallets = this.props.wallets.map((wallet, index) => {
            return (
                <div onClick={() => this_component.props.onChangeWallet()} key={"wallet-" + index}>
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
                </div>
            );
        });
        return (
            <div>

                <HashRouter>
                    <div>
                        <CreateWalletModal onSubmit={(name, description) => this.props.onCreateWallet(name, description)} />

                        <p>
                            <NavLink exact className="btn btn-info wallet-item dashboard" activeClassName='active' to="/">Dashboard</NavLink>
                        </p>
                        {wallets}
                    </div>
                </HashRouter>
            </div>
        );
    }
}
import React from "react";
// import {Redirect, NavLink} from 'react-router-dom'
import { Redirect } from "react-router-dom";

import Cookies from 'universal-cookie';
import Wallet from './WalletList';
import TransactionList from './TransactionList';
import Configs from '../Configs';
import $ from 'jquery'
import Util from '../utils';
import './App.css';
import Transaction from "./TransactionList";

const cookies = new Cookies();

export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);

        let user_id = cookies.get('user_id');
        this.state  = {
            user_id: user_id,
            wallet_id: null,
            wallets: [],
            transactions: []
        };

        this.updateTotalInfo();
        this.updateWalletsDetail();
    }

    updateWalletsDetail(){
        let walletId = this.props.match.params.id;
        if (walletId){
            let thisComponent = this;
            let url  = Configs.API_prefix + `/wallet/${walletId}`;
            $.get(url, function (response) {
                if (!response.status){
                    Util.showSnackBar(response.message);
                    return;
                }

                thisComponent.setState({
                    wallet_id: walletId,
                    transactions: response.data.transactions
                });
            })
        }
    }

    updateTotalInfo(){
        let thisComponent = this;
        let url  = Configs.API_prefix + `/user/${this.state.user_id}/total-info`;
        $.get(url, function (response) {
            if (!response.status){
                Util.showSnackBar(response.message);
                return;
            }

            thisComponent.setState({
                wallets: response.data.wallets,
                transactions: response.data.transactions
            });
        })
    }

    render() {
        if (!this.state.user_id)
            return (
                <Redirect to="/login" push/>
            );


        return (
            <div className="container-fluid text-center">
                <h1>My Wallets</h1>
                {/*{this.props.match.params.id}*/}
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <Wallet wallets={this.state.wallets} />
                    </div>
                    <div className="col-sm-8 text-left">
                        <TransactionList wallet_id={this.state.wallet_id} transactions={this.state.transactions} />
                    </div>
                    <div className="col-sm-2 sidenav">
                        <div className="sidebar-nav-fixed pull-right affix">
                            <div className="well ads">
                                <p>ADS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
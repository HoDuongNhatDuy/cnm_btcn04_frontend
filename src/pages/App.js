import React from "react";
// import {Redirect, NavLink} from 'react-router-dom'
import {Redirect} from "react-router-dom";

import Cookies from 'universal-cookie';
import WalletList from './WalletList';
import TransactionList from './TransactionList';
import Configs from '../Configs';
import $ from 'jquery'
import Util from '../utils';
import './App.css';

const cookies = new Cookies();

export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);

        this.checkUser();

        let user_id = cookies.get('user_id');
        this.state  = {
            user_id: user_id,
            current_wallet: null,
            wallets: [],
            transactions: []
        };

        this.updateTotalInfo();
        this.updateWalletsDetail();
    }

    checkUser() {
        let user_id = cookies.get('user_id');
        console.log(user_id);
        if (!user_id || user_id === null) {
            console.log(123);
            Util.showSnackBar("Please login");
            this.props.history.push('/login');
        }
    }

    updateWalletsDetail() {
        let thisComponent = this;

        let walletId = thisComponent.props.match.params.id;
        if (walletId) {
            let url = Configs.API_prefix + `/wallet/${walletId}`;
            $.get(url, function (response) {
                if (!response.status) {
                    Util.showSnackBar(response.message);
                    return;
                }

                thisComponent.setState({
                    current_wallet: response.data,
                    transactions: response.data.transactions
                });
            })
        }
    }

    updateTotalInfo() {
        let thisComponent = this;
        let url           = Configs.API_prefix + `/user/${this.state.user_id}/total-info`;
        $.get(url, function (response) {
            if (!response.status) {
                Util.showSnackBar(response.message);
                return;
            }

            thisComponent.setState({
                wallets: response.data.wallets,
                transactions: response.data.transactions
            });
        })
    }

    validateCreateWallet(name, description) {
        if (name === '') {
            Util.showSnackBar("Invalid wallet name");
            return false;
        }

        if (description === '') {
            Util.showSnackBar("Invalid wallet description");
            return false;
        }

        return true;
    }

    createWallet(name, description) {
        if (!this.validateCreateWallet(name, description))
            return;

        Util.showSnackBar("Creating wallet");
        let url  = Configs.API_prefix + `/wallet`;
        let data = {
            "user": this.state.user_id,
            "name": name,
            "description": description
        };

        let thisComponent = this;
        $.post(url, data, function (response) {
            if (response.status === 1) {
                thisComponent.updateTotalInfo();
            }
            else {
            }
            Util.showSnackBar(response.message);
        })

    }

    validateCreateTransaction(description, amount, dest_wallet_id) {
        if (description === '') {
            Util.showSnackBar("Invalid transaction description");
            return false;
        }

        if (amount === '' || amount < 0) {
            Util.showSnackBar("Invalid amount");
            return false;
        }

        if (dest_wallet_id === '') {
            Util.showSnackBar("Invalid destination ID");
            return false;
        }

        return true;
    }

    createTransaction(description, amount, dest_wallet_id) {
        if (!this.validateCreateTransaction(description, amount, dest_wallet_id))
            return;

        Util.showSnackBar("Creating wallet");
        let url  = Configs.API_prefix + `/transaction`;
        let data = {
            "source_wallet": this.state.current_wallet._id,
            "dest_wallet": dest_wallet_id,
            "amount": amount,
            "description": description,
        };

        let thisComponent = this;
        $.post(url, data, function (response) {
            if (response.status === 1) {
                thisComponent.updateTotalInfo();
            }
            else {
            }
            Util.showSnackBar(response.message);
        })

    }

    onChangeWallet() {
        let thisSomponent = this;
        setTimeout(function () {
            thisSomponent.updateWalletsDetail();
        }, 100);
    }

    logOut(){
        cookies.remove('user_id');
        this.props.history.push('/login');
    }

    render() {
        if (!this.state.user_id)
            return (
                <Redirect to="/login" push/>
            );

        let title = <h1>Dashboard</h1>;
        if (this.state.current_wallet) {
            title = (
                <div>
                    <h1>{this.state.current_wallet.name} </h1>
                    <p> Wallet ID: {this.state.current_wallet._id} </p>
                </div>
            );
        }

        return (
            <div className="container-fluid text-center">
                <button onClick={() => this.logOut()} className="btn btn-danger pull-right">Logout</button>
                {title}
                <div className="row content">
                    <div className="col-sm-2 sidenav">
                        <WalletList onChangeWallet={() => this.onChangeWallet()} onCreateWallet={(name, description) => this.createWallet(name, description)} wallet_id={this.state.wallet_id} wallets={this.state.wallets}/>
                    </div>
                    <div className="col-sm-8 text-left">
                        <TransactionList onCreateTransaction={(description, amount, dest_wallet_id) => this.createTransaction(description, amount, dest_wallet_id)} wallet_id={this.state.current_wallet ? this.state.current_wallet._id : null} transactions={this.state.transactions}/>
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
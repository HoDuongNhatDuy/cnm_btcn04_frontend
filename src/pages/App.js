import React from "react";
import {Redirect, NavLink} from 'react-router-dom'
import Cookies from 'universal-cookie';
import Wallet from './WalletList';
import Configs from '../Configs';
import $ from 'jquery'
import Util from '../utils';

const cookies = new Cookies();

export default class MyWallet extends React.Component {
    constructor(props) {
        super(props);

        let user_id = cookies.get('user_id');
        this.state  = {
            user_id: user_id,
            wallets: []
        };

        this.updateTotalInfo();
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
                wallets: response.data.wallets
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
                        <h1>Welcome</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat.</p>
                        <hr/>
                        <h3>Test</h3>
                        <p>Lorem ipsum...</p>
                    </div>
                    <div className="col-sm-2 sidenav">
                        <div className="well">
                            <p>ADS</p>
                        </div>
                        <div className="well">
                            <p>ADS</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
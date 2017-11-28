import React from "react";
import './TransactionList.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class TransactionList extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        let user_id = cookies.get('user_id');

        let transactions = this.props.transactions.map((transaction, index) => {
            let is_sent = transaction.source_user === user_id;
            return (
                <blockquote key={"transaction-" + index} className={is_sent ? 'sent' : 'received'}>
                    <div className="row">
                        <div className="col-sm-2 square pull-left">
                            <span className={"glyphicon glyphicon-arrow-" + (is_sent ? 'up' : 'down')}></span>
                        </div>
                        <div className="col-sm-9">
                            <p>{transaction.source_user.username + " - " + transaction.source_wallet.name}</p>
                            <p>{transaction.description}</p>
                        </div>
                        <div className="col-sm-1 amount">{transaction.amount}</div>
                    </div>
                    <cite>{transaction.created_at.substr(0, 19).replace("T", " ")}</cite>
                </blockquote>
            );
        });

        return (
            <div>
                {transactions}
            </div>
        );
    }
}
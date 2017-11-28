import React from "react";
import {Modal, Button} from 'react-bootstrap'
import './CreateModal.css';

export default class CreateTransactionModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    submit() {

        this.close();
    }
    render() {
        return (
            <div>
                <button className="create-wallet-btn btn-success btn" onClick={() => this.open()}>
                    <span className="glyphicon glyphicon-plus"></span>
                </button>

                <Modal show={this.state.showModal} onHide={() => this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Wallet</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="control-label col-sm-1" htmlFor="description">Description</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="description" id="description" placeholder="Transaction description" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-1" htmlFor="dest_wallet_id">Destination wallet ID</label>
                                    <div className="col-sm-5">
                                        <input type="text" className="form-control" ref="dest_wallet_id" id="dest_wallet_id" placeholder="Destination wallet ID" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={() => this.submit()}>Submit</button>
                        <Button onClick={() => this.close()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
};


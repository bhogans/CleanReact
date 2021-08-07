import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { actionCreators } from '../store/WarrantyClaims';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import AddClaimModal from './AddClaimModal';
import EditClaimModal from './EditClaimModal';
import CurrencyFormat from 'react-currency-format';
import Moment from 'react-moment';

class Queue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    componentDidMount() {
        // This method is called when the component is first added to the document
        this.ensureDataFetched();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        this.ensureDataFetched();
    }

    ensureDataFetched() {
        this.props.requestWarrantyClaims();
    }

    editModalItem() {
        this.setState({
            requiredItem: 1
        });
    }

    render() {
        return (
            <div>
                <h1>Warranty Claims Approval Queue</h1>
                <p>Warranty claims pending review are listed below.</p>
                {renderWarrantyClaimsTable(this.props)}
                <AddClaimModal buttonLabel="Add Claim" isVisible={this.props.auth.currentUser.roles.indexOf("submitter") > -1} onSuccess={this.props.requestWarrantyClaims}> </AddClaimModal>
                <EditClaimModal buttonLabel="Edit Claim" isVisible={this.props.auth.currentUser.roles.indexOf("submitter") > -1} open={this.state.showModal}> </EditClaimModal>
            </div>
        );
    }

}

const rightAlign = {
    textAlign: 'right'
};

function renderWarrantyClaimsTable(props) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>Date Submitted</th>
                    <th>Name</th>
                    <th>Product</th>
                    <th>Issue</th>
                    <th>Documented?</th>
                    <th style={rightAlign}>Payment Amount</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.claims.map(claim =>
                    <tr key={claim.id}>
                        <td><Moment date={claim.dateSubmitted} format={'YYYY/MM/DD'} /></td>
                        <td>{claim.firstName} {claim.lastName}</td>
                        <td>{claim.product}</td>
                        <td>{claim.issue}</td>
                        <td>{claim.isDocumented}</td>
                        <td style={rightAlign}>
                            <CurrencyFormat value={claim.paymentAmount} displayType={'text'} prefix={'$'} fixedDecimalScale={true} decimalScale={2} />
                        </td>
                        <td>{claim.status === 0 ? 'Pending' : claim.status === 1 ? 'Approved' : 'Rejected'}</td>
                        <td><button className="btn btn-danger" onClick={() => this.setState({ showModal: true })}>Review</button></td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

function mapState(state) {

    return {
        auth: state.auth,
        claims: state.claims.claims
    }
}

export default connect(
    mapState,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Queue);


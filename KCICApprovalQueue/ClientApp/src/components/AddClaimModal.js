import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import Form from "react-jsonschema-form";
import PropTypes from 'prop-types';
import { actionCreators } from '../store/NewClaim';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddClaimModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
        this.addClaim = this.addClaim.bind(this);

        this.schema = {
            "title": "Add a Warranty Claim",
            "description": "Please enter the fields below.",
            "type": "object",
            "required": [
                "firstName",
                "lastName"
            ],
            "properties": {
                "firstName": {
                    "type": "string",
                    "title": "First name",
                    "default": "Chuck"
                },
                "lastName": {
                    "type": "string",
                    "title": "Last name",
                    "default": "Norris"
                },
                "Product": {
                    "type": "string",
                    "title": "Product",
                    "default": "4k TV"
                },
                "Issue": {
                    "type": "string",
                    "title": "Issue",
                    "default": "Image of my roundhouse kick broke it"
                },
                "PaymentAmount": {
                    "type": "number",
                    "title": "Requested Payment Amount",
                    "default": 1
                }
            }
        };

        this.ui = {
            "Issue": {
                "ui:widget": "textarea"
            }
        };
    }

    toggle() {
        if (this.props.modalOpen) {
            this.props.closeNewClaimModal();
        } else {
            this.props.openNewClaimModal();
        }

    }

    onSubmit = async (form) => {
        await this.props.submitNewClaim(form.formData);
    }

    addClaim() {
        this.formRef.submit();
    }

    render() {
        if (this.props.isVisible) {
            let renderError = this.props.error ? <Alert color="danger">{this.props.error.message}</Alert> : "";
            return (
                <div>
                    <div >
                        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                        <Modal isOpen={this.props.modalOpen} toggle={this.toggle} className={this.props.className}>
                            <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <Form schema={this.schema} uiSchema={this.ui} ref={(form) => { this.formRef = form; }} onSubmit={this.onSubmit}>
                                    <br />
                                </Form>
                                {renderError}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.addClaim} disabled={this.props.submitting}>Add Claim</Button>{' '}
                                <Button color="secondary" onClick={this.toggle} disabled={this.props.submitting}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            );
        }
        return (<div></div>);

    }
}

AddClaimModal.propTypes = {
    isVisible: PropTypes.bool,
    onSuccess: PropTypes.func,
    buttonLabel: PropTypes.string
}

export default connect(
    state => state.newClaim,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(AddClaimModal);

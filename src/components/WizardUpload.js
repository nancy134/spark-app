import React from 'react';
import {
    Modal
} from 'react-bootstrap';

class WizardUpload extends React.Component{
    render(){
        return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Upload to Constant Contact
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
        </Modal>
        );
    }
}

export default WizardUpload;
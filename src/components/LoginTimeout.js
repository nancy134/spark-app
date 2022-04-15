import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';

class LoginTimeout extends React.Component {

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
                        Login Timeout
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col>
                    <div>Your Login has timed out</div>
                </Col>
            </Row>
            <Row>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onLogin}
                >
                    Login
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default LoginTimeout;
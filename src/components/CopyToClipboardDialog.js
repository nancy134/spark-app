import React from 'react';

import {
    Modal,
    Button,
    Row,
    Col,
    Form
} from 'react-bootstrap';
import { CopyToClipboard} from 'react-copy-to-clipboard';

class CopyToClipboardDialog extends React.Component {
   constructor(props){
       super(props);
       this.state = {
           value: '',
           copied: false
       };
   }

   componentDidMount(){
       this.setState({value: this.props.textToCopy});
   }

   render(){
       return(
        <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>Copy to Clipboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Col>
                    <Form>
                    <Form.Control
                        disabled
                        value={this.props.textToCopy}
                    />
                    <CopyToClipboard text={this.state.value}
                        onCopy={() => this.setState({copied: true})}
                    > 
                    <Button>Copy to Clipboard</Button>
                    </CopyToClipboard>
                    { this.state.copied ? <div style={{color: 'red'}}>Copied.</div>:null}
                    </Form>
                </Col>
            </Row>
            <Row>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onHide}
                >
                    Close 
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default CopyToClipboardDialog;

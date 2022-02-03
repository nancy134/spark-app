import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import constantHelper from '../helpers/constant';

class UploadAuthConstant extends React.Component {

    constructor(props){
        super(props);

        this.handleSignin = this.handleSignin.bind(this);
        this.openSignInWindow = this.openSignInWindow.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);

        this.state = {
            loggedIn: false
        };
    }

    componentDidMount(){
        // Get authorization url or validate existing access token
        var that = this;
        constantHelper.getAuthUrl(that).then(function(result){
            if (result.access_token){
                constantHelper.getAccount(that).then(function(account){
                    console.log(account);
                }).catch(function(err){
                    console.log(err);
                });
            }
        }).catch(function(err){
            console.log(err);
        });
    }

    handleSignin(){
         this.openSignInWindow(this.state.authUrl, "Constant Contact Signin");
    }

    receiveMessage (event){
        console.log("receiveMessage()");
        console.log("event:");
        console.log(event);
        var that = this;
        constantHelper.receiveLoginMessage(that, event, this.state.redirect_uri);
    }

    openSignInWindow (url, name) {
        var that = this;
        constantHelper.openSignInWindow(that, url, name);
    }

    render(){

       var nextDisabled = true;
       if (this.state.loggedIn) nextDisabled = false;

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
                        Authentication
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        { !this.state.loggedIn ?
                        <Button
                            onClick={this.handleSignin}
                        >
                            Login Constant Contact
                        </Button>
                        :
                        <div>
                        <p>You're logged into Constant Contact</p>
                        <p>{this.state.name}</p>
                        <p>{this.state.organization}</p>
                        <p>{this.props.cc_access_token}</p>
                        </div>
                        }

                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    disabled={nextDisabled}
                    onClick={this.props.onNext}
                >
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default UploadAuthConstant;

import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import constantHelper from '../helpers/constant';

let windowObjectReference = null;
let previousUrl = null;

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
            console.log(result);
        }).catch(function(err){
            console.log(err);
        });    
    }

    handleSignin(){
         this.openSignInWindow(this.state.authUrl, "Constant Contact Signin");
    }

    receiveMessage (event){
        var that = this;

        console.log(event);
        var code = null;
        if (event.data){
            code = event.data.substring(6);
        }

        if (code){
            console.log("code: "+code);
            window.removeEventListener('message', this.receiveMessage);
            this.setState({
                authorizationCode: event.data.substring(6)
            });

            constantHelper.getAuthToken(that, code, this.state.redirect_uri).then(function(result){
                console.log(result);
            }).catch(function(err){
                console.log(err);
            });
        }
    }

    openSignInWindow (url, name) {
        // remove any existing event listeners
        window.removeEventListener('message', this.receiveMessage);

        // window features
        const strWindowFeatures =
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
            or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
            then we load it in the already opened secondary window and then
            we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference.focus();
        } else {
            /* else the window reference must exist and the window
            is not closed; therefore, we can bring it back on top of any other
            window with the focus() method. There would be no need to re-create
            the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', this.receiveMessage, false);
        // assign the previous URL
        previousUrl = url;
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
                        <p>You're logged into Constant Contact</p> 
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

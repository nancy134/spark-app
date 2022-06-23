import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import { useGoogleLogin } from '@react-oauth/google';
import authService from '../services/auth';
import memoryStorageService from '../services/memoryStorage';

const GMAIL_SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

function UploadAuthGoogle(props) {
    const login = useGoogleLogin({
     
        onSuccess: codeResponse =>{
            authService.getGoogleTokens(codeResponse).then(function(tokens){
                memoryStorageService.setGoogleTokens(tokens.tokens);
                memoryStorageService.setGoogleAccessToken(tokens.access_token);
                memoryStorageService.setGoogleRefreshToken(tokens.refresh_token);
                props.onGoogleSignin();
            }).catch(function(err){
                console.log(err);
            });
        },
        flow: 'auth-code',
        scope: GMAIL_SCOPES
    });

   return(
        <Modal
            show={props.show}
            onHide={props.onCancel}
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
                        { props.googleLoggedIn ?
                        <p>Your are logged into Google</p>
                        :
                        <Button
                            onClick={() => login()}
                        >Sign in with Google</Button>
                        }
                    </Col>
                </Row>
            <Row>
            </Row>

            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={props.onNext}
                >
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
   );

}

export default UploadAuthGoogle;

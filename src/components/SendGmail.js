import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Spinner,
    Form,
    Alert
} from 'react-bootstrap';
import googleService from '../services/google';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/style.css';

interface IProps {}
interface IState {
  emails: string[];
}

class SendGmail extends React.Component<IProps, IState> {

    constructor(props){
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleToChange = this.handleToChange.bind(this);

        this.state = {
            successMessage: null,
            emails: []
        };
    }

    handleToChange(e){
        this.setState({
            to: e.target.value
        });
    }

    handleUpload(){
        var that = this;

        if (this.state.successMessage){
            this.handleDone();
            this.props.onCancel();
            return;
        } 
        var body = {};
        var html = this.props.htmlContent;
        html = html.replace("[[trackingImage]]", "");
        //this.props.htmlContent.replace("[[trackingImage]]","");
        body.options = {
            to: this.state.emails,
            //cc: 'nancy_piedra@hotmail.com',
            //replyTo: 'nancy.piedra@gmail.com',
            subject: 'Your listings',
            html: html,
        };
        this.setState({
            loading: true
        });
        googleService.sendEmail(body).then(function(response){
            that.setState({
                successMessage: "Email successfully sent.",
                loading: false
            });
        }).catch(function(err){
            that.setState({
                loading: false
            });
        });
    }

    handleDone(){
        this.props.onNext();
    }

    componentDidMount(){
    }

   render(){
        var buttonName = "Send Email";
        if (this.state.successMessage) buttonName = "Done";
        const { emails } = this.state;

       return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Send with Gmail 
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row>
                <Form>
                <Form.Group>
                <Form.Label>To:</Form.Label>
                <div
                    className="pb-2"
                >
                <ReactMultiEmail
                    placeholder="Enter email addresses"
                    emails={emails}
                    onChange={(_emails: string[]) => {
                        this.setState({ emails: _emails });
                    }}
                    validateEmail={email => {
                        return isEmail(email); // return boolean
                    }}
                    getLabel={(
                        email: string,
                        index: number,
                        removeEmail: (index: number) => void,
                        ) => {
                            return (
                                <div data-tag key={index}>
                                    {email}
                                    <span data-tag-handle onClick={() => removeEmail(index)}>
                                        ×
                                    </span>
                                </div>
                            );
                        }}
                />
                </div>
                </Form.Group>
                </Form>
            </Row>
            <Row>
                <Col>
                    { this.state.successMessage ?
                    <Alert>
                        <p>{this.state.successMessage}</p>
                    </Alert>
                    : null }

                </Col>
            </Row>
            <Row>
                <iframe
                    title="preview"
                    frameBorder="0"
                    src={this.props.previewUrl}
                    height="300"
                />
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                     onClick={this.handleUpload}
                 >
                 { this.state.loading ?
                 <span><span>{buttonName}&nbsp;</span><Spinner
                     as="span"
                     animation="border"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                 /></span>
                 :
                 <span>{buttonName}</span>
                 }
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default SendGmail;

import React from 'react';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import SparkContacts from '../components/SparkContact.js';
import ConstantContacts from '../components/ConstantContact.js';
import UploadAuthConstant from '../components/UploadAuthConstant';
class Contact extends React.Component{
    constructor(props){
        super(props);

        this.handleLoginConstantContact = this.handleLoginConstantContact.bind(this);

        this.state = {
            showConstantContactLogin: false
        };
    }

    handleLoginConstantContact(){
        this.setState({
            showConstantContactLogin: true
        });
    }

    render(){
        return(
        <React.Fragment>
            { this.state.showConstantContactLogin ?
            <UploadAuthConstant
                show={this.state.showConstantContactLogin}
                //onNext={this.handleUploadAuthConstantNext}
                //onCancel={this.handleUploadAuthConstantCancel}
            />
            : null }

            <MDBRow>
                <MDBCol>
                    { this.props.loggedIn ?
                    <SparkContacts
                        loggedIn={this.props.loggedIn}                
                    />
                    :
                    <MDBBtn>Log into FlexMLS</MDBBtn>
                    }
                </MDBCol>
                <MDBCol size="2">
                    <MDBBtn>Sync Contacts</MDBBtn>
                </MDBCol>
                <MDBCol>
                    { this.props.ccLoggedIn ?
                    <ConstantContacts 
                        ccLoggedIn={this.props.ccLoggedIn}
                    />
                    :
                    <MDBBtn
                        onClick={this.handleLoginConstantContact}
                    >Log Into Constant Contact</MDBBtn> 
                    }
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;

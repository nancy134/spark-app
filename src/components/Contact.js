import React from 'react';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import SparkContacts from '../components/SparkContact.js';
import ConstantContacts from '../components/ConstantContact.js';

class Contact extends React.Component{

    render(){
        return(
        <React.Fragment>
            <MDBRow>
                <MDBCol>
                <SparkContacts
                    loggedIn={this.props.loggedIn}                
                />
                </MDBCol>
                <MDBCol size="2">
                    <MDBBtn>Sync Contacts</MDBBtn>
                </MDBCol>
                <MDBCol>
                    <ConstantContacts />
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;
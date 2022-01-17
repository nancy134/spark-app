import React from 'react';
import MaterialTable, {
    Column
} from '@material-table/core';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';


const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Last Name", field: "lastName" },
];

const data = [
    { firstName: "Tod", lastName: "Miles" },
    { firstName: "Jess", lastName: "Smith" }
  
];


class Contact extends React.Component{

    render(){
        return(
        <React.Fragment>
            <MDBRow>
                <MDBCol>
                <MDBBtn>Login into FlexMLS</MDBBtn>
                <MaterialTable
                    columns={columns}
                    data={data}
                    title="FlexMLS Contacts"
                />                
                </MDBCol>
                <MDBCol size="2">
                    <MDBBtn>Sync Contacts</MDBBtn>
                </MDBCol>
                <MDBCol>
                <MDBBtn>Login into Constant Contact</MDBBtn>
                <MaterialTable                    columns={columns}
                    data={data}
                    title="Constant Contacts"
                />
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;
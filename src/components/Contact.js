import React from 'react';
import MaterialTable, {
} from '@material-table/core';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import sparkService from '../services/spark';

const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Last Name", field: "lastName" },
];

const data = [
    { firstName: "Tod", lastName: "Miles" },
    { firstName: "Jess", lastName: "Smith" }
  
];


class Contact extends React.Component{
    handleSelectChange = (event, rowData) => {
        console.log("[fired]::handleSelectionChange", rowData);
    };

    componentDidMount(){
        sparkService.getContacts().then(function(contacts){
            console.log(contacts);
        }).catch(function(err){
            console.log(err);
        });
    }

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
                    onSelectionChange={this.handleSelectChange}
                    options={{
                        selection: true
                      }}
                    detailPanel={({rowData}) => {
                    return (
                        <div
                            style={{
                                fontSize: 20,
                                textAlign: 'center',
                                height: 100
                            }}
                        >
                        This is a detailed panel for {rowData.firstName}
                        </div>
                    )}}
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
                    options={{
                        selection: true
                      }}
                    detailPanel={({rowData}) => {
                        return (
                            <div
                                style={{
                                    fontSize: 20,
                                    textAlign: 'center',
                                    height: 100
                                }}
                            >
                            This is a detailed panel for {rowData.firstName}
                            </div>
                        )}}
                />
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;
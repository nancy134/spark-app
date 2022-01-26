import React from 'react';
import MaterialTable, {
} from '@material-table/core';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import sparkService from '../services/spark';

import constantService from '../services/constant';

const ccColumns = [
    { title: "First Name", field: "GivenName" },
    { title: "Last Name", field: "FamilyName" },
  ];
  

const columns = [
    { title: "First Name", field: "GivenName" },
    { title: "Last Name", field: "FamilyName" },
  ];

const data = [
    { firstName: "Tod", lastName: "Miles" },
    { firstName: "Jess", lastName: "Smith" }
  
];


class Contact extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            sparkContacts: null
        }
    }

    handleSelectChange = (event, rowData) => {
        console.log("[fired]::handleSelectionChange", rowData);
    };

    componentDidMount(){
        var that = this;
        sparkService.getContacts().then(function(contacts){
            that.setState({
                sparkContacts: contacts.D.Results
            });
            console.log(contacts);
        }).catch(function(err){
            console.log(err);
        });

        constantService.getContacts().then(function(contacts){
            console.log(contacts);
        }).catch(function(err){
            console.log(err);
        });

    }




    render(){
        return(
        <React.Fragment>
            <MDBRow>
            { this.state.sparkContacts ?
                <MDBCol>
                <MDBBtn>Login into FlexMLS</MDBBtn>
                <MaterialTable
                    columns={columns}
                    data={this.state.sparkContacts}
                    title="FlexMLS Contacts"
                    onSelectionChange={this.handleSelectChange}
                    options={{
                        selection: true
                      }}
                    detailPanel={({rowData}) => {
                    return (
                        <div
                            style={{
                                margin: "80px",
                                fontSize: 20,
                                textAlign: 'left',
                                height: 200
                            }}
                        >
                        <p><span>DisplayName: </span><span>{rowData.DisplayName}</span></p>
                        <p><span>{rowData.HomeStreetAddress} {rowData.HomeLocality}, {rowData.HomeRegion} {rowData.HomePostalCode}</span></p>
                        <p><span>{rowData.PrimaryEmail}</span></p>
                        <p><span>{rowData.PrimaryPhoneNumber}</span></p>
                        </div>
                    )}}
                />
                </MDBCol>
                : null }
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
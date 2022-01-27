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
import constantHelper from '../helpers/constant';

const ccColumns = [
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
  ];
  

const sparkColumns = [
    { title: "First Name", field: "GivenName" },
    { title: "Last Name", field: "FamilyName" },
  ];



class Contact extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            sparkContacts: null,
            ccContacts: null
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

        constantHelper.checkAuth().then(function(ccAuth){
            constantService.getContacts().then(function(contacts){
                console.log(contacts);
                that.setState({
                    ccContacts: contacts.contacts
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });

    }




    render(){
        console.log("this.state.ccContacts:");
        console.log(this.state.ccContacts);
        return(
        <React.Fragment>
            <MDBRow>
            { this.state.sparkContacts ?
                <MDBCol>
                <MDBBtn>Login into FlexMLS</MDBBtn>
                <MaterialTable
                    columns={sparkColumns}
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
                { this.state.ccContacts ?
                <MDBCol>
                <MDBBtn>Login into Constant Contact</MDBBtn>
                <MaterialTable                    columns={ccColumns}
                    data={this.state.ccContacts}
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
                : null }
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;

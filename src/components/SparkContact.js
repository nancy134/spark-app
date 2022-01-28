import React from 'react';
import MaterialTable, {
} from '@material-table/core';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import sparkService from '../services/spark';

const sparkColumns = [
    { title: "First Name", field: "GivenName" },
    { title: "Last Name", field: "FamilyName" },
];

class SparkContacts extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            sparkContacts: null,
            sparkLoggedIn: null
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
    }

    render(){
        return(
        <React.Fragment>
            <MDBRow>
            { this.state.sparkContacts ?
                <MDBCol>
 
            {this.props.loggedIn ?
                <p>You are logged into FlexMLS</p>
                :
                <MDBBtn>Login into FlexMLS</MDBBtn>
                }
 
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
            </MDBRow>
        </React.Fragment>
        );
    }
}
export default SparkContacts;
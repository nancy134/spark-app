import React from 'react';
import MaterialTable, {
} from '@material-table/core';

import {
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

import constantService from '../services/constant';

const ccColumns = [
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
];

class ConstantContacts extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            ccContacts: null,
        }
    }

    handleSelectChange = (event, rowData) => {
        console.log("[fired]::handleSelectionChange", rowData);
    };

    componentDidMount(){
        var that = this;
        if (this.props.ccLoggedIn){
            constantService.getContacts().then(function(contacts){
                console.log(contacts);
                that.setState({
                    ccContacts: contacts.contacts
                });
            }).catch(function(err){
                console.log(err);
            });
        }

    }

    render(){
        return(
        <React.Fragment>
            <MDBRow>

                <MDBCol>
                { this.props.ccLoggedIn ?
                <p>You're logged into Constant Contact</p>
                :
                <MDBBtn>Login into Constant Contact</MDBBtn>
                }
                { this.state.ccContacts ?
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
                
                : null }
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}
export default ConstantContacts;

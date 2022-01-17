import React from 'react';
import MaterialTable, {
    Column
} from '@material-table/core';
import {
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

const lookup = { true: "Available", false: "Unavailable" };

const columns = [
  { title: "First Name", field: "firstName" },
  { title: "Last Name", field: "lastName" },
  { title: "Birth Year", field: "birthYear", type: "numeric" },
  { title: "Availablity", field: "availability", lookup }
];

const data = [
  { firstName: "Tod", lastName: "Miles", birthYear: 1987, availability: true },
  { firstName: "Jess", lastName: "Smith", birthYear: 2000, availability: false }
];


class Contact extends React.Component{

    render(){
        return(
        <React.Fragment>
            <MDBRow>
                <MDBCol>
                <MaterialTable
                    columns={columns}
                    data={data}
                />
                </MDBCol>
                <MDBCol>
                <MaterialTable
                    columns={columns}
                    data={data}
                />
                </MDBCol>
            </MDBRow>
        </React.Fragment>
        );
    }
}

export default Contact;
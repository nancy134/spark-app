import React from 'react';
import {
    MDBRow,
    MDBCol,    
    MDBTable,
    MDBTableHead, 
    MDBTableBody
} from 'mdb-react-ui-kit';

class Contact extends React.Component{

    render(){
        return(
        <React.Fragment>
            <MDBRow>
            <MDBCol>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>First</th>
                        <th scope='col'>Last</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
            </MDBCol>
            <MDBCol>
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>First</th>
                        <th scope='col'>Last</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    <tr>
                        <th scope='row'>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <th scope='row'>2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                </MDBTableBody>
            </MDBTable>
            </MDBCol>
            </MDBRow>            
        </React.Fragment>
        );
    }
}

export default Contact;
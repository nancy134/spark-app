import React from 'react';
import './HomePage.css';
import Contact from '../components/Contact';

export class ContactPage extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Contact
                    loggedIn={this.props.loggedIn}
                    ccLoggedIn={this.props.ccLoggedIn}
                />
            </React.Fragment>
        );
    }
}

export default ContactPage;


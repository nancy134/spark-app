import React from 'react';
import './HomePage.css';
import Contact from '../components/Contact';

export class ContactPage extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Contact
                    loggedIn={this.props.loggedIn}
                />
            </React.Fragment>
        );
    }
}

export default ContactPage;


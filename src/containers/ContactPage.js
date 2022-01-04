import React from 'react';
import './HomePage.css';
import Contact from '../components/Contact';

export class ContactPage extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Contact
                    loading={this.props.loading}
                />
            </React.Fragment>
        );
    }
}

export default ContactPage;


import React from 'react';
import './HomePage.css';
import Home from '../components/Home';

export class HelpPage extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Home
                    loading={this.props.loading}
                />
            </React.Fragment>
        );
    }
}

export default HelpPage;


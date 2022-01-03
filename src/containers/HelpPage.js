import React from 'react';
import './HomePage.css';
import Help from '../components/Help';

export class HelpPage extends React.Component {

    render(){
        return(
            <React.Fragment>
                <Help
                    loading={this.props.loading}
                />
            </React.Fragment>
        );
    }
}

export default HelpPage;


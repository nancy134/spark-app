import React from 'react';
import './HomePage.css';
import Home from '../components/Home';

export class HomePage extends React.Component {
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

export default HomePage; 

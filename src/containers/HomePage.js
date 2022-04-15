import React from 'react';
import './HomePage.css';
import Home from '../components/Home';

export class HomePage extends React.Component {
    componentDidMount(){
    }
 
    render(){
        return(
            <React.Fragment>
                    <Home
                    onLoginTimeout={this.props.onLoginTimeout}
                    />
            </React.Fragment>
        );
    }
}

export default HomePage; 

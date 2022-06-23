import React, { Component } from 'react';
import {
} from 'react-bootstrap';

export class GoogleAuth extends Component { 

    constructor(props){
        super(props);

        var message = "window.opener === false";
        if (window.opener){
            message = "window.opener === true";
            window.opener.postMessage(window.location.search);
            window.close();
        }
        this.state = {
            message: message
        };
    }
    render(){
        return (
        <React.Fragment>
            <p>{this.state.message}</p>
        </React.Fragment>
        );
    }
}

export default GoogleAuth;

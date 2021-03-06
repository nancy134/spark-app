import React from 'react';
import { Component } from 'react';
import {
    NavDropdown,
    Nav
} from 'react-bootstrap';
import authService from '../services/auth';

let windowObjectReference = null;
let previousUrl = null;

export class AccountButton extends Component{
    constructor(props){
        super(props);

        this.handleSignin = this.handleSignin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openSignInWindow = this.openSignInWindow.bind(this);
        this.receiveMessage = this.receiveMessage.bind(this);
        this.updateAccessToken = this.updateAccessToken.bind(this);

        this.state = {
            authorizationCode: null,
            loggingIn: false
        }
    }
    handleSignin(){
         if (this.props.authUrl){
             this.openSignInWindow(this.props.authUrl, "FlxexMLS Signin");
         }
    }
    handleLogout(){
       this.props.onLogout("NoDialog");
    }

    updateAccessToken(accessToken, refreshToken){
        this.props.onLogin(accessToken, refreshToken);
    }

    receiveMessage (event){
        var that = this;
        window.removeEventListener('message', this.receiveMessage);
        var check = null;
        if (event.data && !event.data.type){
            check = event.data.substring(1,5);
        }
        if (check  === "code"){
            var code = event.data.substring(6);

            this.setState({
                loggingIn: true,
                authorizationCode: event.data.substring(6)
            });
            var body = {
                code: code,
                redirect_uri: this.props.redirect_uri
            };
            authService.getSparkAuthToken(body).then(function(result){
                that.setState({
                    loggingIn: false
                });
                var d = new Date();
                d.setSeconds(d.getSeconds() + result.expires_in);
                //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                that.updateAccessToken(result.access_token, result.refresh_token);
            }).catch(function(err){
                that.setState({
                    loggingIn: false
                });
                console.log(err);
            });
        } else {
            console.log("error logging in");
            this.setState({
                errorMessage: "Error logging in"
            });
        }
    }

    receiveMessage2 (event){
        window.removeEventListener('message', this.receiveMessage);
    }

    openLogoutWindow(url, name){
        window.removeEventListener('message', this.receiveMessage2);

        const strWindowFeatures =
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference.focus();
        } else {
            windowObjectReference.focus();
        }

        window.addEventListener('message', this.receiveMessage2, false);
        previousUrl = url;
    }

    openSignInWindow (url, name) {
        // remove any existing event listeners
        window.removeEventListener('message', this.receiveMessage);

        // window features
        const strWindowFeatures =
        'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

        if (windowObjectReference === null || windowObjectReference.closed) {
            /* if the pointer to the window object in memory does not exist
            or if such pointer exists but the window was closed */
            windowObjectReference = window.open(url, name, strWindowFeatures);
        } else if (previousUrl !== url) {
            /* if the resource to load is different,
            then we load it in the already opened secondary window and then
            we bring such window back on top/in front of its parent window. */
            windowObjectReference = window.open(url, name, strWindowFeatures);
            windowObjectReference.focus();
        } else {
            /* else the window reference must exist and the window
            is not closed; therefore, we can bring it back on top of any other
            window with the focus() method. There would be no need to re-create
            the window or to reload the referenced resource. */
            windowObjectReference.focus();
        }

        // add the listener for receiving a message from the popup
        window.addEventListener('message', this.receiveMessage, false);
        // assign the previous URL
        previousUrl = url;
   }
    componentDidMount(){
    }
    onMyAccount(){
        var url = window.location.protocol + "//" + window.location.hostname + "/account";
        window.location.href = url;
    }
    render(){
        var userName="Logged In";
        if (this.props.user){
            userName = this.props.user.Name;
        }
       
        var appLoading = false;
        var loggingIn = false;

        if (this.state.loggingIn || this.props.loggingIn){
            loggingIn = true;
        }
        if (this.props.appLoading){
            appLoading = true;
        }

        var navLinkText = "Login";
        if (appLoading) navLinkText = "App Loading...";
        if (loggingIn) navLinkText = "Logging in...";

        return(
        <React.Fragment>
        { this.props.loggedIn ?
        <NavDropdown
            title={userName}
            id="basic-nav-dropdown"
            className="murban-dropdown"
        >
            <NavDropdown.Item
                onClick={() => this.handleLogout()}   
            >Logout</NavDropdown.Item>
        </NavDropdown>
        :
        <Nav.Link
            onClick={() => this.handleSignin()}
        >{navLinkText}</Nav.Link>
        }
        </React.Fragment>
        );
    }
}
export default AccountButton;

import React from 'react';

//import {
//    Spinner
//} from 'react-bootstrap';
import AppNavBar from './AppNavBar';
import './App.css';
import AppRoutes from './Routes';
import memoryStorageService from './services/memoryStorage';
import sparkHelper from './helpers/spark';
import constantHelper from './helpers/constant';

class App extends React.Component {
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSavedSearchSelect = this.handleSavedSearchSelect.bind(this);
        this.handleGenerateEmail = this.handleGenerateEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
        this.handleInitializeSavedSearches = this.handleInitializeSavedSearches.bind(this);
        this.receiveLoginMessage = this.receiveLoginMessage.bind(this);

        this.state = {

            // App
            appLoading: true,

            // Authentication
            redirect_uri: null,
            authUrl: null,
            loggingIn: false,
            loggedIn: false,

            // Saved Searches
            savedSearches: null,
            selectedSavedSearch: null,

            // Listings
            listings: null,
            loadingSavedSearchListings: false,

            // Preview
            previewUrl: null,
            htmlContent: null,

            // Constant Contact Auth
            ccLoggedIn: null

        };
    }

    handleLogin(accessToken, refreshToken){
        var that = this;
        this.setState({
            loggingIn: true
        });
        if (accessToken && refreshToken){

            memoryStorageService.setAccessToken(accessToken);
            memoryStorageService.setRefreshToken(refreshToken);

            sparkHelper.initializeAccount(that).then(function(result){
                that.setState({
                    loggingIn: false,
                    loggedIn: true,
                    user: result.user,
                    account: result.account
                });
            }).catch(function(err){
                that.setState({
                    loggingIn: false
                });
                console.log(err);
           });
        } else {
            that.setState({
                loggingIn: false
            });
        }
    }

    handleLogout(){
        sparkHelper.logout(this);
    }

    handleInitializeSavedSearches(){
        var that = this;
        sparkHelper.initializeSavedSearches(that);
    }

    handleSavedSearchSelect(id, name){
        var that = this;
        sparkHelper.savedSearchSelect(that, that.state.accessToken, id, name);
    }

    handleGenerateEmail(id){
        var that = this;
        that.setState({
            loading: true
        });
        sparkHelper.generateEmail(that, that.state.selectedSavedSearch);
    }

    handleUploadEmail(id){
        this.setState({
            activityId: id
        });
    }

    receiveLoginMessage(event, redirect_url){
        var that = this;
        constantHelper.receiveLoginMessage(that, event, redirect_url);
    }

    componentDidMount(){

       var that = this;
       that.setState({
           appLoading: true
       });
       sparkHelper.initializeApp(that);

    }

    render(){
        console.log("this.state.cc_access_token: "+this.state.cc_access_token);
        return(
        <React.Fragment>
            <AppNavBar 
                appLoading={this.state.appLoading}
                loggingIn={this.state.loggingIn}
                onLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                onLoginTimeout={this.handleLogout}
                onLogout={this.handleLogout}
                authUrl={this.state.authUrl}
                redirect_uri={this.state.redirect_uri}
                user={this.state.user}
            />
        <AppRoutes
              appLoading={this.state.appLoading}
              loggingIn={this.state.loggingIn}
              loggedIn={this.state.loggedIn}
              onLoginTimeout={this.handleLogout}

              listings={this.state.listings}
              loadingSavedSearchListings={this.state.loadingSavedSearchListings}

              savedSearches={this.state.savedSearches}
              onSavedSearchSelect={this.handleSavedSearchSelect}
              selectedSavedSearch={this.state.selectedSavedSearch}
              selectedSavedSearchName={this.state.selectedSavedSearchName}

              previewUrl={this.state.previewUrl}
              htmlContent={this.state.htmlContent}
              onGenerateEmail={this.handleGenerateEmail}
              user={this.state.user}
              account={this.state.account}
              onInitializeSavedSearches={this.handleInitializeSavedSearches}
              activityId={this.state.activityId}
              onUploadEmail={this.handleUploadEmail}

              ccLoggedIn={this.state.ccLoggedIn}
              ccAccountId={this.state.ccAccountId}
              cc_access_token={this.state.cc_access_token}
              receiveLoginMessage={this.receiveLoginMessage}

          >
          </AppRoutes>
        </React.Fragment>
        );
    }
}

export default App;


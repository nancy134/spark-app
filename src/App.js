import React from 'react';

//import {
//    Spinner
//} from 'react-bootstrap';
import AppNavBar from './AppNavBar';
import './App.css';
import AppRoutes from './Routes';
import memoryStorageService from './services/memoryStorage';
import sparkHelper from './helpers/spark';
import authService from './services/auth';

class App extends React.Component {
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSavedSearchSelect = this.handleSavedSearchSelect.bind(this);
        this.handleGenerateEmail = this.handleGenerateEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
        this.handleInitializeSavedSearches = this.handleInitializeSavedSearches.bind(this);

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

            //var that = this;
            sparkHelper.initializeHome(that).then(function(result){
            }).catch(function(err){
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

    componentDidMount(){

       var that = this;
       that.setState({
           appLoading: true
       });
       authService.getSparkAuthUrl().then(function(result){
           if (result.access_token){
               that.handleLogin(result.access_token, result.refresh_token);
           }
           var hostname = window.location.hostname;
           var protocol = window.location.protocol;
           var redirect_uri =
               protocol +
               "//" +
               hostname +
               "/sparkauth";

           var url =
               result.authUrl +
               redirect_uri;
           that.setState({
               authUrl: url,
               redirect_uri: redirect_uri,
               appLoading: false
           });
       }).catch(function(err){
           that.setState({
               appLoading: false
           });
           console.log(err);
       });
    }

    render(){
        return(
        <React.Fragment>
            <AppNavBar 
                appLoading={this.state.appLoading}
                loggingIn={this.state.loggingIn}
                onLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                onLogout={this.handleLogout}
                authUrl={this.state.authUrl}
                redirect_uri={this.state.redirect_uri}
                user={this.state.user}
            />
            <AppRoutes
              appLoading={this.state.appLoading}
              loggingIn={this.state.loggingIn}
              loggedIn={this.state.loggedIn}

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
          >
          </AppRoutes>
        </React.Fragment>
        );
    }
}

export default App;


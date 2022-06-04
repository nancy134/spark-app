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
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import LoginTimeout from './components/LoginTimeout';

class App extends React.Component {
    constructor(props){
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSavedSearchSelect = this.handleSavedSearchSelect.bind(this);
        this.handleNewSavedSearchPage = this.handleNewSavedSearchPage.bind(this);
        this.handleGenerateEmail = this.handleGenerateEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
        this.handleInitializeSavedSearches = this.handleInitializeSavedSearches.bind(this);
        this.receiveLoginMessage = this.receiveLoginMessage.bind(this);
        this.handleShowSettings = this.handleShowSettings.bind(this);
        this.handleSaveSettings = this.handleSaveSettings.bind(this);
        this.handleCancelSettings = this.handleCancelSettings.bind(this);

        this.state = {

            // App
            appLoading: true,
            showLoginTimeout: false,

            // Authentication
            redirect_uri: null,
            authUrl: null,
            loggingIn: false,
            loggedIn: false,
            cookies: instanceOf(Cookies).isRequired,

            // Saved Searches
            savedSearches: null,
            selectedSavedSearch: null,
            loadingSavedSearches: false,

            // Listings
            listings: null,
            loadingSavedSearchListings: false,

            // Preview
            previewUrl: null,
            htmlContent: null,
            generatingEmail: false,
            header_text: null,
            showSettings: false,
            templateId: "noTemplate",

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

    handleLogout(type){
        sparkHelper.logout(this, type);
    }

    handleInitializeSavedSearches(){
        var that = this;
        sparkHelper.initializeSavedSearches(that);
    }

    handleSavedSearchSelect(id, name){
        var that = this;
        sparkHelper.savedSearchSelect(that, that.state.accessToken, id, name);
    }

    handleNewSavedSearchPage(page){
        var that = this;
        sparkHelper.savedSearchNewPage(that, that.state.accessToken, page);
    }

    handleGenerateEmail(id){
        var that = this;
        that.setState({
            generatingEmail: true
        });

        var body = {
            header_text: this.state.header_text 
        }
        sparkHelper.generateEmail(that, that.state.selectedSavedSearch, body);
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

    handleLoginTimeoutCancel(){
        this.setState({
            showLoginTimeout: false
        });
    }

    handleShowSettings(){
        this.setState({
            showSettings: true
        });
    }

    handleSaveSettings(id, settings){
        this.setState({
            header_text: settings,
            templateId: id,
            showSettings: false,
            htmlContent: null,
            previewUrl: null
        });
    }

    handleCancelSettings(){
        this.setState({
            showSettings: false
        });
    }

    componentDidMount(){

       var that = this;
       that.setState({
           appLoading: true
       });
       sparkHelper.initializeApp(that);

    }

    render(){
        return(
        <React.Fragment>
            <LoginTimeout
                show={this.state.showLoginTimeout}
                onCancel={this.handleLoginTimeoutCance}
            />
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
              onNewSavedSearchPage={this.handleNewSavedSearchPage}
              loadingSavedSearches={this.state.loadingSavedSearches}

              previewUrl={this.state.previewUrl}
              htmlContent={this.state.htmlContent}
              onGenerateEmail={this.handleGenerateEmail}
              generatingEmail={this.state.generatingEmail}
              templateId={this.state.templateId}

              user={this.state.user}
              account={this.state.account}
              onInitializeSavedSearches={this.handleInitializeSavedSearches}
              activityId={this.state.activityId}
              onUploadEmail={this.handleUploadEmail}
              onShowSettings={this.handleShowSettings}
              onSaveSettings={this.handleSaveSettings}
              onCancelSettings={this.handleCancelSettings}
              showSettings={this.state.showSettings}

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

export default withCookies(App);


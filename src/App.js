import React from 'react';

import {
} from 'react-bootstrap';
import AppNavBar from './AppNavBar';
import './App.css';
import AppRoutes from './Routes';
import memoryStorageService from './services/memoryStorage';
import sparkHelper from './helpers/spark';

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
            loading: true,
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            listings: null,
            savedSearches: null,
            selectedSavedSearch: null,
            previewUrl: null,
            htmlContent: null
        };
    }

    handleLogin(accessToken, refreshToken){
        this.setState({
            loading: true
        });
        if (accessToken && refreshToken){
            var that = this;
            sparkHelper.initializeHome(that, accessToken, refreshToken).then(function(result){
                that.setState({
                    loggedIn: true,
                    loading: false
                });
            }).catch(function(err){
                console.log(err);
                that.setState({
                    loggedIn: false,
                    loading: false
                });
            });
        } else {
            console.log(err);
            that.setState({
                loading: false
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
        console.log("handleUploadEmail: "+id);
        this.setState({
            activityId: id
        });
    }

    componentDidMount(){
      var that = this;
      var accessToken = memoryStorageService.accessToken();
      var refreshToken = memoryStorageService.refreshToken();
      if (accessToken){

          sparkHelper.checkAuthentication(that, accessToken, refreshToken).then(function(result){
              that.setState({
                  loggedIn: true
              });
          }).catch(function(err){
              that.setState({
                  loggedIn: false,
                  loading: false
              });
          });
      } else {
          this.setState({
              loggedIn: false,
              loading: false
          });
      }

    }

    render(){
        return(
        <React.Fragment>
            <AppNavBar 
                onLogin={this.handleLogin}
                loggedIn={this.state.loggedIn}
                onLogout={this.handleLogout}
                accessToken={this.state.accessToken}
                refreshToken={this.state.refreshToken}
                user={this.state.user}
            />
            <AppRoutes
              loading={this.state.loading}
              loggedIn={this.state.loggedIn}
              accessToken={this.state.accessToken}
              refreshToken={this.state.refreshToken}
              listings={this.state.listings}
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


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

        this.state = {
            loading: true,
            loggedIn: false,
            accessToken: null,
            refreshToken: null,
            listings: null,
            savedSearches: null,
            selectedSavedSearch: null
        };
    }

    handleLogin(accessToken, refreshToken){
        console.log("handleLogin()");
        console.log("accessToken: "+accessToken);
        this.setState({
            loading: true
        });
        if (accessToken && refreshToken){
            var that = this;
            sparkHelper.initialize(that, accessToken, refreshToken).then(function(result){
                that.setState({
                    loggedIn: true,
                    loading: false
                });
                console.log(result);
            }).catch(function(err){
                that.setState({
                    loggedIn: false,
                    loading: false
                });
                console.log(err);
            });
        } else {
            console.log("accessToken and refreshToken are null");
            that.setState({
                loading: false
            });
        }
    }

    handleLogout(){
        sparkHelper.logout(this);
    }

    handleSavedSearchSelect(id, name){
        var that = this;
        sparkHelper.savedSearchSelect(that, that.state.accessToken, id, name);
    }

    handleGenerateEmail(id){
        console.log("handleSparkGenerateEmail");
        console.log(id);
        var that = this;
        sparkHelper.generateEmail(that, that.state.selectedSavedSearch);
    }

    componentDidMount(){
      var that = this;
      var accessToken = memoryStorageService.accessToken();
      var refreshToken = memoryStorageService.refreshToken();
      if (accessToken){
          console.log("has authentication token, checking validity");

          sparkHelper.checkAuthentication(that, accessToken, refreshToken).then(function(result){
              that.setState({
                  loggedIn: true
              });
              console.log("found valid authentication");
          }).catch(function(err){
              console.log("authentication invalid");
              console.log(err);
              that.setState({
                  loggedIn: false,
                  loading: false
              });
          });
      } else {
          console.log("No authentication token");
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

            />
            <AppRoutes
              loggedIn={this.state.loggedIn}
              accessToken={this.state.accessToken}
              refreshToken={this.state.refreshToken}
              listings={this.state.listings}
              savedSearches={this.state.savedSearches}
              onSavedSearchSelect={this.handleSavedSearchSelect}
              selectedSavedSearch={this.state.selectedSavedSearch}
              selectedSavedSearchName={this.state.selectedSavedSearchName}
              previewUrl={this.state.previewUrl}
              onGenerateEmail={this.handleGenerateEmail}
          >
          </AppRoutes>

        </React.Fragment>
        );
    }
}

export default App;


import React from 'react';
import { 
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import HomePage from './containers/HomePage';
import SavedSearchesPage from './containers/SavedSearchesPage';
import Spark from './containers/Spark';
import ConstantContact from './containers/ConstantContact';
import HelpPage from './containers/HelpPage';
import ContactPage from './containers/ContactPage';
import AboutPage from './containers/AboutPage';
import AccountPage from './containers/AccountPage';
import Privacy from './containers/Privacy';
import TermsPage from './containers/TermsPage';


class AppRoutes extends React.Component {
    componentDidMount(){
    }
    render(){
        return(
            <BrowserRouter>
            <Routes>
                
            <Route
                path="/contacts"
                element={
                    <ContactPage
                    loggedIn={this.props.loggedIn}
                    onLoginTimeout={this.props.onLoginTimeout}
                    ccLoggedIn={this.props.ccLoggedIn}
                    />
                }
            />

            <Route
                path="/"
                element={
                    <HomePage
                        onLoginTimeout={this.props.onLoginTimeout}
                    />

                }
            />
            <Route
                path="/home"
                element={
                    <HomePage
                        onLoginTimeout={this.props.onLoginTimeout}
                    />
                }
            />
            <Route
                path="/savedsearches"
                element={
                    <SavedSearchesPage
                        appLoading={this.props.appLoading}
                        loggingIn={this.props.loggingIn}
                        loggedIn={this.props.loggedIn}
                        onLoginTimeout={this.props.onLoginTimeout}
                        collections={this.props.collections}
                        collectionListings={this.props.collectionListings}
                        onCollectionSelect={this.props.onCollectionSelect}
                        selectedCollection={this.props.selectedCollection}
                        savedSearches={this.props.savedSearches}
                        loadingSavedSearches={this.props.loadingSavedSearches}
                        listings={this.props.listings}
                        loadingSavedSearchListings={this.props.loadingSavedSearchListings}
                        onSavedSearchSelect={this.props.onSavedSearchSelect}
                        selectedSavedSearch={this.props.selectedSavedSearch}
                        selectedSavedSearchName={this.props.selectedSavedSearchName}
                        onNewSavedSearchPage={this.props.onNewSavedSearchPage}
                        previewUrl={this.props.previewUrl}
                        htmlContent={this.props.htmlContent}
                        onGenerateEmail={this.props.onGenerateEmail}
                        generatingEmail={this.props.generatingEmail}

                        user={this.props.user}
                        account={this.props.account}
                        onInitializeSavedSearches={this.props.onInitializeSavedSearches}
                        activityId={this.props.activityId}

                        onUploadEmail={this.props.onUploadEmail}
                        ccAccountId={this.props.ccAccountId}
                        cc_access_token={this.props.cc_access_token}
                        receiveLoginMessage={this.props.receiveLoginMessage}

                        onShowSettings={this.props.onShowSettings}
                        onSaveSettings={this.props.onSaveSettings}
                        onCancelSettings={this.props.onCancelSettings}
                        showSettings={this.props.showSettings}
                        templateId={this.props.templateId}
                    />
                }
            />
            <Route
                path="/help"
                element={<HelpPage />}
            />

            <Route
                path="/about"
                element={<AboutPage />}
            />

            <Route
                path="/account"
                element={<AccountPage />}
            />

            <Route
                path="/terms"
                element={<TermsPage />}
            />

            <Route
                path="/privacy"
                element={<Privacy />}
            />

            <Route
                path="/sparkauth"
                element={<Spark />}
            />
            <Route
                path="/constantcontact"
                element={<ConstantContact/>} />
            />
            </Routes>
            </BrowserRouter>
        );
    }
}
export default AppRoutes;

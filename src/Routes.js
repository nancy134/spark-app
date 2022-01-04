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

class AppRoutes extends React.Component {
    render(){
        return(
            <BrowserRouter>
            <Routes>
                
            <Route
                path="/contacts"
                element={<ContactPage />}
            />

            <Route
                path="/"
                element={
                    <HomePage
                    />
                }
            />
            <Route
                path="/home"
                element={
                    <HomePage
                    />
                }
            />
            <Route
                path="/savedsearches"
                element={
                    <SavedSearchesPage
                        loading={this.props.loading}
                        loggedIn={this.props.loggedIn}
                        accessToken={this.props.accessToken}
                        refreshToken={this.props.refreshToken}
                        collections={this.props.collections}
                        collectionListings={this.props.collectionListings}
                        onCollectionSelect={this.props.onCollectionSelect}
                        selectedCollection={this.props.selectedCollection}
                        savedSearches={this.props.savedSearches}
                        listings={this.props.listings}
                        onSavedSearchSelect={this.props.onSavedSearchSelect}
                        selectedSavedSearch={this.props.selectedSavedSearch}
                        selectedSavedSearchName={this.props.selectedSavedSearchName}
                        previewUrl={this.props.previewUrl}
                        htmlContent={this.props.htmlContent}
                        onGenerateEmail={this.props.onGenerateEmail}
                        user={this.props.user}
                        account={this.props.account}
                        onInitialize={this.props.onInitializeSavedSearches}
                    />
                }
            />
            <Route
                path="/help"
                element={<HelpPage />}
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

import React from 'react';
import { 
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import HomePage from './containers/HomePage';
import SavedSearchesPage from './containers/SavedSearchesPage';
import Spark from './containers/Spark';

class AppRoutes extends React.Component {
    render(){
        return(
            <BrowserRouter>
            <Routes>
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
                        onGenerateEmail={this.props.onGenerateEmail}
                    />
                }
            />
            <Route
                path="/sparkauth"
                element={<Spark />}
            />
            </Routes>
            </BrowserRouter>
        );
    }
}
export default AppRoutes;

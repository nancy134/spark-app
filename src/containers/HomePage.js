import React from 'react';
import './HomePage.css';
import CollectionPreview from '../components/CollectionPreview';
import SavedSearches from '../components/SavedSearches';
import Listings from '../components/Listings';
import Home from '../components/Home';

export class HomePage extends React.Component {
    render(){
        return(
            <React.Fragment>
                { this.props.loggedIn ?
                <div className="main-container">
                    <div className="left">
                        
                        <SavedSearches
                            accessToken={this.props.accessToken}
                            savedSearches={this.props.savedSearches}
                            onSavedSearchSelect={this.props.onSavedSearchSelect}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                        />
                    </div>
                    <div className="middle">

                        <Listings
                            accessToken={this.props.accessToken}
                            listings={this.props.listings}
                        />
                    </div>
                    <div className="right">

                        <CollectionPreview
                            previewUrl={this.props.previewUrl}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                            onGenerateEmail={this.props.onGenerateEmail}
                            selectedSavedSearchName={this.props.selectedSavedSearchName}
                        />
                    </div>
                </div>
                :
                <Home
                    loading={this.props.loading}
                />
                }
            </React.Fragment>
        );
    }
}

export default HomePage; 

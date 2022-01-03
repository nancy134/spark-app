import React from 'react';
import Preview from '../components/Preview';
import SavedSearches from '../components/SavedSearches';
import Listings from '../components/Listings';
import {
} from 'react-bootstrap';

export class SavedSearchesPage extends React.Component {
    componentDidMount(){
        this.props.onInitialize();
    }
    render(){
        return(
            <React.Fragment>
                { this.props.loggedIn ?
                <div className="main-container pt-3 px-5">
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

                        <Preview
                            loading={this.props.loading}
                            previewUrl={this.props.previewUrl}
                            htmlContent={this.props.htmlContent}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                            onGenerateEmail={this.props.onGenerateEmail}
                            selectedSavedSearchName={this.props.selectedSavedSearchName}
                            user={this.props.user}
                            account={this.props.account}
                        />
                    </div>
                </div>
                :
                <div className="px-5">
                   You must login with your FlexMLS account to see your Saved Searches
                </div>
                }
            </React.Fragment>
        );
    }
}

export default SavedSearchesPage; 

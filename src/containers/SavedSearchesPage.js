import React from 'react';
import Preview from '../components/Preview';
import SavedSearches from '../components/SavedSearches';
import Listings from '../components/Listings';
import {
    Spinner
} from 'react-bootstrap';

export class SavedSearchesPage extends React.Component {
    render(){
        return(
            <React.Fragment>
                { this.props.loggedIn && !this.props.loggingIn && !this.props.appLoading ? 
                <div className="main-container pt-3 px-5">
                    <div className="left">
                        
                        <SavedSearches
                            onInitialize={this.props.onInitializeSavedSearches}
                            accessToken={this.props.accessToken}
                            savedSearches={this.props.savedSearches}
                            onSavedSearchSelect={this.props.onSavedSearchSelect}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                        />
                    </div>
                    <div className="middle">

                        <Listings
                            listings={this.props.listings}
                            loadingSavedSearchListings={this.props.loadingSavedSearchListings}
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
                            activityId={this.props.activityId}
                            onUploadEmail={this.props.onUploadEmail}
                            cc_redirect_uri={this.props.cc_redirect_uri}
                            ccAccountId={this.props.ccAccountId}
                            cc_access_token={this.props.cc_access_token}
                            receiveLoginMessage={this.props.receiveLoginMessage}

                        />
                    </div>
                </div>
                :
                
                <div className="px-5">
                   { this.props.appLoading || this.props.loggingIn ?
                       <Spinner
                           animation="border"
                           variant="primary"
                       />
                   :
                   <p>You must login with your FlexMLS account to see your Saved Searches</p>
                   }
                </div>
                }
            </React.Fragment>
        );
    }
}

export default SavedSearchesPage; 

import React from 'react';
import Preview from '../components/Preview';
import SavedSearches from '../components/SavedSearches';
import Listings from '../components/Listings';
import './SavedSearchesPage.css';
import {
    Spinner,
    Alert,
    Row,
    Col
} from 'react-bootstrap';
import {isMobile} from 'react-device-detect';

export class SavedSearchesPage extends React.Component {

    render(){
        var showMobileSpinner = false;
        var showSavedSearches = false;
        var showPreview = false;
        var showLoginPrompt = false;

        if (this.props.loggingIn ||
            this.props.appLoading ||
            this.props.generatingEmail){
            showMobileSpinner = true;
        } else if (this.props.mobilePreview){
            showPreview = true;
        } else if (!this.props.loggedIn){
            showLoginPrompt = true;
        } else {
            showSavedSearches = true;
        }

        return(
            <Row><Col md={12} className="d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                { this.props.loggedIn && !this.props.loggingIn && !this.props.appLoading ? 
                <div className="main-container pt-3 px-5">
                    <div className="left">
                        
                        <SavedSearches
                            onInitialize={this.props.onInitializeSavedSearches}
                            accessToken={this.props.accessToken}
                            savedSearches={this.props.savedSearches}
                            onSavedSearchSelect={this.props.onSavedSearchSelect}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                            onLoginTimeout={this.props.onLoginTimeout}
                            onNewSavedSearchPage={this.props.onNewSavedSearchPage}
                            loadingSavedSearches={this.props.loadingSavedSearches}
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
                            width={this.props.width}
                            mobilePreview={this.props.mobilePreview}
                            isMobile={isMobile}
                            loading={this.props.loading}
                            previewUrl={this.props.previewUrl}
                            htmlContent={this.props.htmlContent}
                            selectedSavedSearch={this.props.selectedSavedSearch}
                            onGenerateEmail={this.props.onGenerateEmail}
                            generatingEmail={this.props.generatingEmail}

                            selectedSavedSearchName={this.props.selectedSavedSearchName}
                            loadingSavedSearchListings={this.props.loadingSavedSearchListings}
                            user={this.props.user}
                            account={this.props.account}
                            activityId={this.props.activityId}
                            onUploadEmail={this.props.onUploadEmail}
                            cc_redirect_uri={this.props.cc_redirect_uri}
                            ccAccountId={this.props.ccAccountId}
                            cc_access_token={this.props.cc_access_token}
                            receiveLoginMessage={this.props.receiveLoginMessage}

                            onShowSettings={this.props.onShowSettings}
                            onSaveSettings={this.props.onSaveSettings}
                            onCancelSettings={this.props.onCancelSettings}
                            showSettings={this.props.showSettings}
                            templateId={this.props.templateId}

                            onGoogleSignin={this.props.onGoogleSignin}
                            googleLoggedIn={this.props.googleLoggedIn}

                            onSendViaText={this.props.onSendViaText}
                        />
                    </div>
                </div>
                :
                
                <div className="text-center p-5">
                   { this.props.appLoading || this.props.loggingIn ?
                       <Spinner
                           animation="border"
                           variant="primary"
                       />
                   :
                   <Row>
                       <Col xs={3}></Col>
                       <Col>
                           <Alert variant="danger">
                               <p>You must login with your FlexMLS account to see your Saved Searches</p>
                           </Alert>
                       </Col>
                       <Col xs={3}></Col>
                   </Row>
                   }
                </div>
                }
            </Col>
            { this.props.width < 768 ?
            <Col>
                { showMobileSpinner ?
                <div className="text-center p-5">
                       <Spinner
                           animation="border"
                           variant="primary"
                       />
                </div>
                : null }
                { showLoginPrompt ?
                <div className="text-center p-5">
                   <Row>
                       <Col xs={3}></Col>
                       <Col>
                           <Alert variant="danger">
                               <p>You must login with your FlexMLS account to see your Saved Searches</p>
                           </Alert>
                       </Col>
                       <Col xs={3}></Col>
                   </Row>
                </div>
                : null }
                { showSavedSearches ? 
                <SavedSearches
                    mode="mobile"
                    onInitialize={this.props.onInitializeSavedSearches}
                    accessToken={this.props.accessToken}
                    savedSearches={this.props.savedSearches}
                    onSavedSearchSelect={this.props.onSavedSearchSelect}
                    selectedSavedSearch={this.props.selectedSavedSearch}
                    onLoginTimeout={this.props.onLoginTimeout}
                    onNewSavedSearchPage={this.props.onNewSavedSearchPage}
                    loadingSavedSearches={this.props.loadingSavedSearches}
                />
                : null } 
                { showPreview ?
                <Preview
                    width={this.props.width}
                    mobilePreview={this.props.mobilePreview}
                    isMobile={isMobile}
                    loading={this.props.loading}
                    previewUrl={this.props.previewUrl}
                    htmlContent={this.props.htmlContent}
                    selectedSavedSearch={this.props.selectedSavedSearch}
                    onGenerateEmail={this.props.onGenerateEmail}
                    generatingEmail={this.props.generatingEmail}

                    selectedSavedSearchName={this.props.selectedSavedSearchName}
                    loadingSavedSearchListings={this.props.loadingSavedSearchListings}
                    user={this.props.user}
                    account={this.props.account}
                    activityId={this.props.activityId}
                    onUploadEmail={this.props.onUploadEmail}
                    cc_redirect_uri={this.props.cc_redirect_uri}
                    ccAccountId={this.props.ccAccountId}
                    cc_access_token={this.props.cc_access_token}
                    receiveLoginMessage={this.props.receiveLoginMessage}

                    onShowSettings={this.props.onShowSettings}
                    onSaveSettings={this.props.onSaveSettings}
                    onCancelSettings={this.props.onCancelSettings}
                    showSettings={this.props.showSettings}
                    templateId={this.props.templateId}

                    onGoogleSignin={this.props.onGoogleSignin}
                    googleLoggedIn={this.props.googleLoggedIn}

                    onSendViaText={this.props.onSendViaText}
                />
                : null}
            </Col>
            : null }
            </Row>
        );
    }
}

export default SavedSearchesPage; 

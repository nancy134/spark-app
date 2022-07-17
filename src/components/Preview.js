import React from 'react';
import {
    Navbar,
    Nav,
    Button,
    Spinner,
    Dropdown,
    DropdownButton
}
from 'react-bootstrap';
import WizardUpload from '../components/WizardUpload';
import PreviewSettings from '../components/PreviewSettings';
import CopyToClipboardDialog from '../components/CopyToClipboardDialog';

class Preview extends React.Component{
    constructor(props){
        super(props);
        this.handlePreviewEmail = this.handlePreviewEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
        this.handleUploadEmailCancel = this.handleUploadEmailCancel.bind(this);
        this.handleUploadEmailDone = this.handleUploadEmailDone.bind(this);
        this.handleViewEmail = this.handleViewEmail.bind(this);
        this.handleNav = this.handleNav.bind(this);
        this.handleSettingsCancel = this.handleSettingsCancel.bind(this); 

        this.handleUploadToCC = this.handleUploadToCC.bind(this);
        this.handleSendViaGmail = this.handleSendViaGmail.bind(this);
        this.handleSendViaText = this.handleSendViaText.bind(this);

        this.handleShowCopyLink = this.handleShowCopyLink.bind(this);
        this.handleHideCopyLink = this.handleHideCopyLink.bind(this);

        this.state = {
            showWizardUpload: false,
            startWizard: null,
            showCopyToClipboard: false
        };
    }

    handleNav(selectedKey){
        if (selectedKey === "settings"){
            this.props.onShowSettings();
        }
        if (selectedKey === "back"){
            console.log("go back");
        }
    }

    handleUploadToCC(){
        this.setState({
            startWizard: "CC",
            showWizardUpload: true
        });
    }

    handleSendViaGmail(){
        this.setState({
            startWizard: "Gmail",
            showWizardUpload: true
        });
    }

    handleSendViaText(){
        this.props.onSendViaText();
    }

    handleShowCopyLink(){
        console.log("handleShowCopyLink()");
        this.setState({
            showCopyToClipboard: true
        });
    }

    handleHideCopyLink(){
        this.setState({
            showCopyToClipboard: false
        });
    }

    handlePreviewEmail(){
         window.open(this.props.previewUrl, "_blank");
    }

    handleUploadEmail(){
        this.setState({
            showWizardUpload: true
        });
    }

    handleUploadEmailCancel(){
        this.setState({
            showWizardUpload: false
        });
    }

    handleUploadEmailDone(id){
        this.setState({
            showWizardUpload: false,
        });
        this.props.onUploadEmail(id);
    }
    
    handleViewEmail(){
        var url =
            "https://app.constantcontact.com/pages/ace/v1#/" +
            this.props.activityId;

        window.open(url, "_blank");
    }

    handleSettingsCancel(){
        this.props.onCancelSettings();
    }

    render(){
        var disableGenerateEmail = false;
        if (this.props.previewUrl) disableGenerateEmail=true;
        return(
        <React.Fragment>
            { this.state.showCopyToClipboard ?
            <CopyToClipboardDialog
                show={this.state.showCopyToClipboard}
                onHide={this.handleHideCopyLink}
                textToCopy={this.props.previewUrl}
            />
            : null}
            { this.state.showWizardUpload ?
            <WizardUpload
                start={this.state.showWizardUpload}
                startWizard={this.state.startWizard}
                html={this.props.previewUrl}
                htmlContent={this.props.htmlContent}
                user={this.props.user}
                
                account={this.props.account}
                ccAccountId={this.props.ccAccountId}
                cc_access_token={this.props.cc_access_token}
                receiveLoginMessage={this.props.receiveLoginMessage}

                selectedSavedSearch={this.props.selectedSavedSearch}
                selectedSavedSearchName={this.props.selectedSavedSearchName}
                onCancel={this.handleUploadEmailCancel}
                onDone={this.handleUploadEmailDone}

                onGoogleSignin={this.props.onGoogleSignin}
                googleLoggedIn={this.props.googleLoggedIn}
                previewUrl={this.props.previewUrl}
            />
            : null }
            { this.props.showSettings ?
            <PreviewSettings
                show={this.props.showSettings}
                onSave={this.props.onSaveSettings}
                onCancel={this.handleSettingsCancel}
                user={this.props.user}
                templateId={this.props.templateId}
            />
            : null }
            <div className="main-container">
            <div className="child scrollable">
            <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand>
                        { this.props.width < 768 ?
                        <a href="./savedsearches" >Back&nbsp;</a>
                        :
                        <span>Preview</span>
                        }
                    </Navbar.Brand>

                    <Navbar.Collapse className="justify-content-end">
                        <Nav
                            onSelect={(selectedKey) => this.handleNav(selectedKey)}
                        >
                            <Nav.Link
                                eventKey="settings"
                            >Customization</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
            </Navbar>
            <div className="text-center p-2">
                <h3>{this.props.selectedSavedSearchName}</h3>
                <span className="px-3">
                { !this.props.loadingSavedSearchListings &&
                  this.props.width >= 768 ?
                <Button
                   disabled={disableGenerateEmail}
                   onClick={this.props.onGenerateEmail}
                >
                   <div>Generate Email</div>
                </Button>
                : null }
                </span>
                { this.props.previewUrl ? 
		<span>
                <span className="px-3">

                 <DropdownButton as="span" title="Email Options">
                    { this.props.activityId ?
                    <Dropdown.Item
                        as="button"
                        onClick={this.handleViewEmail}
                    >View in Constant Contact</Dropdown.Item>
                    :
                    <Dropdown.Item
                        as="button"
                        onClick={() => {this.handleUploadToCC()}}
                    >Upload to Constant Contact</Dropdown.Item>
                    }
                    <Dropdown.Item
                        as="button"
                        onClick={() => {this.handleSendViaGmail()}}
                    >Send via Gmail (Beta)</Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        onClick={() => {this.handlePreviewEmail()}}
                    >Preview in New Window</Dropdown.Item>
                    <Dropdown.Item
                        as="button"
                        onClick={() => {this.handleShowCopyLink()}}
                    >Copy Link</Dropdown.Item>
                    { this.props.isMobile ?
                    <Dropdown.Item
                        as="button"
                        onClick={() => {this.handleSendViaText()}}
                    >Send via Text</Dropdown.Item>
                    : null }
                 </DropdownButton>

                </span>
		</span>
                : null}

            </div>
            { this.props.generatingEmail ?
            <div className="text-center">
                <Spinner
                    animation="border"
                    variant="primary"
                />
            </div>
            :
             <iframe title="preview" frameBorder="0" src={this.props.previewUrl} className="frame-container" />
            }
        </div>
        </div>
        </React.Fragment>
        );
    }
}

export default Preview;

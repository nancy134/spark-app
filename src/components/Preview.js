import React from 'react';
import {
    Navbar,
    Button,
    Container,
    Spinner
}
from 'react-bootstrap';
import WizardUpload from '../components/WizardUpload';

class Preview extends React.Component{
    constructor(props){
        super(props);
        this.handlePreviewEmail = this.handlePreviewEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
        this.handleUploadEmailCancel = this.handleUploadEmailCancel.bind(this);
        this.handleUploadEmailDone = this.handleUploadEmailDone.bind(this);
        this.handleViewEmail = this.handleViewEmail.bind(this);
        this.state = {
            showWizardUpload: false
        };
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


    render(){
        console.log("this.props.generatingEmail: "+this.props.generatingEmail); 
        var disableGenerateEmail = false;
        if (this.props.previewUrl) disableGenerateEmail=true;
        return(
        <React.Fragment>
            { this.state.showWizardUpload ?
            <WizardUpload
                start={this.state.showWizardUpload}
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
            />
            : null }
            <div className="main-container">
            <div className="child scrollable">
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                <Navbar.Brand>Preview</Navbar.Brand>
                </Container>
            </Navbar>
            <div className="text-center p-2">
                <span className="px-3">
                <Button
                   disabled={disableGenerateEmail}
                   onClick={this.props.onGenerateEmail}
                >
                   <div>Generate Email</div>
                   <div>for</div>
                   <div>{this.props.selectedSavedSearchName}</div>
                </Button>
                </span>
                { this.props.previewUrl ? 
		<span>
                <span className="px-3">
                <Button
                    onClick={this.handlePreviewEmail}
                >
                    <div>Preview email</div>
                    <div>in</div>
                    <div>new window</div>
                </Button>
                </span>
                <span className="px-3">

                { this.props.activityId ?
                     <Button onClick={this.handleViewEmail}>
                     <div>View Email</div>
                     <div>in</div>
                     <div>Constant Contact</div>
                 </Button>
                 :
                 <Button onClick={this.handleUploadEmail}>

                     <div>Upload</div>
                     <div>to</div>
                     <div>Constant Contact</div>
                 </Button>
                 }

                </span>
		</span>
                : null }

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

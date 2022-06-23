import React from 'react';
import UploadAuthConstant from '../components/UploadAuthConstant';
import UploadConstant from '../components/UploadConstant';
import UploadAuthGoogle from '../components/UploadAuthGoogle';
import SendGmail from '../components/SendGmail';

class WizardUpload extends React.Component{
    constructor(props){
        super(props);

        this.handleUploadAuthConstantNext = this.handleUploadAuthConstantNext.bind(this);
        this.handleUploadAuthConstantCancel = this.handleUploadAuthConstantCancel.bind(this);

        this.handleUploadAuthGoogleNext = this.handleUploadAuthGoogleNext.bind(this);
        this.handleUploadAuthGoogleCancel = this.handleUploadAuthGoogleCancel.bind(this);

        this.handleUploadConstantNext = this.handleUploadConstantNext.bind(this);
        this.handleUploadConstantCancel = this.handleUploadConstantCancel.bind(this);

        this.handleSendGmailNext = this.handleSendGmailNext.bind(this);
        this.handleSendGmailCancel = this.handleSendGmailCancel.bind(this);

        this.state = {
            showUploadAuthConstant: true,
            showUploadAuthGoogle: true,
            showUplaodConstant: false,
            showSendGmail: false
        };
    }

    handleUploadAuthConstantNext(){
        this.setState({
            showUploadAuthConstant: false,
            showUploadConstant: true
        });
    }

    handleUploadAuthConstantCancel(){
        this.setState({
            showUploadAuthConstant: false
        });
        this.props.onCancel();
    }

    handleUploadAuthGoogleNext(){
        this.setState({
            showUploadAuthGoogle: false,
            showSendGmail: true
        });
    }

    handleUploadAuthGoogleCancel(){
        this.setState({
            showUploadAuthGoogle: false
        });
        this.props.onCancel();
    }

    handleUploadConstantNext(id){
        this.props.onDone(id);
    }

    handleUploadConstantCancel(){
        this.setState({
            showUplaodConstant: false
        });
        this.props.onCancel();
    }

    handleSendGmailNext(){
    }

    handleSendGmailCancel(){
        this.setState({
            showSendGmail: false
        });
        this.props.onCancel();
    }

    render(){
        var startWizardCC = this.props.start && this.state.showUploadAuthConstant && this.props.startWizard === "CC";
        var startWizardGmail = this.props.start && this.state.showUploadAuthGoogle && this.props.startWizard === "Gmail";
        return(
        <React.Fragment>
            { startWizardGmail ?
            <UploadAuthGoogle
                show={this.props.start}
                onGoogleSignin={this.props.onGoogleSignin}
                googleLoggedIn={this.props.googleLoggedIn}
                onNext={this.handleUploadAuthGoogleNext}
                onCancel={this.handleUploadAuthGoogleCancel}
            />
            : null }
            { startWizardCC ?
            <UploadAuthConstant
                show={this.props.start}
                onNext={this.handleUploadAuthConstantNext}
                onCancel={this.handleUploadAuthConstantCancel}
                cc_access_token={this.props.cc_access_token}
                ccAccountId={this.props.ccAccountId}
                receiveLoginMessage={this.props.receiveLoginMessage}
            />
            : null }
            { this.state.showUploadConstant ?
            <UploadConstant
                html={this.props.html}
                htmlContent={this.props.htmlContent}
                user={this.props.user}
                account={this.props.account}
                ccAccountId={this.props.ccAccountId}
                cc_access_token={this.props.cc_access_token}

                show={this.state.showUploadConstant}
                onNext={this.handleUploadConstantNext}
                onCancel={this.handleUploadConstantCancel}
                selectedSavedSearch={this.props.selectedSavedSearch}
                selectedSavedSearchName={this.props.selectedSavedSearchName}
            />
            : null }
            { this.state.showSendGmail ?
                <SendGmail
                    show={this.state.showSendGmail}
                    onNext={this.handleSendGmailNext}
                    onCancel={this.handleSendGmailCancel}
                    previewUrl={this.props.previewUrl}
                    htmlContent={this.props.htmlContent}
                />
            : null }
        </React.Fragment>
        );
    }
}

export default WizardUpload;

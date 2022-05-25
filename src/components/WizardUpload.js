import React from 'react';
import UploadAuthConstant from '../components/UploadAuthConstant';
import UploadConstant from '../components/UploadConstant';

class WizardUpload extends React.Component{
    constructor(props){
        super(props);

        this.handleUploadAuthConstantNext = this.handleUploadAuthConstantNext.bind(this);
        this.handleUploadAuthConstantCancel = this.handleUploadAuthConstantCancel.bind(this);

        this.handleUploadConstantNext = this.handleUploadConstantNext.bind(this);
        this.handleUploadConstantCancel = this.handleUploadConstantCancel.bind(this);

        this.state = {
            showUploadAuthConstant: true,
            showUplaodConstant: false
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

    handleUploadConstantNext(id){
        this.props.onDone(id);
    }

    handleUploadConstantCancel(){
        this.setState({
            showUplaodConstant: false
        });
        this.props.onCancel();
    }

    render(){
        var startWizard = this.props.start && this.state.showUploadAuthConstant;
        return(
        <React.Fragment>
            { startWizard ?
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
        </React.Fragment>
        );
    }
}

export default WizardUpload;

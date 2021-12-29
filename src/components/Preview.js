import React from 'react';
import {
    Navbar,
    Button,
    Container,
    Spinner
}
from 'react-bootstrap';

class Preview extends React.Component{
    constructor(props){
        super(props);
        this.handlePreviewEmail = this.handlePreviewEmail.bind(this);
        this.handleUploadEmail = this.handleUploadEmail.bind(this);
    }

    handlePreviewEmail(){
         window.open(this.props.previewUrl, "_blank");
    }

    handleUploadEmail(){
        console.log("handleUploadEmail");
    }
    render(){
        return(
        <React.Fragment>
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
                <Button onClick={this.handleUploadEmail}>
                      
                    <div>Upload</div>
                    <div>to</div>
                    <div>Constant Contact</div>
                </Button>
                </span>
		</span>
                : null }

            </div>
            { this.props.loading ?
            <Spinner
                animation="border"
                variant="primary"
            />
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

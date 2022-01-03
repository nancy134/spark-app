import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import constantService from '../services/constant';
import sparkService from '../services/spark';
import memoryService from '../services/memoryStorage';

class UploadConstant extends React.Component {

    constructor(props){
        super(props);

        this.handleUpload = this.handleUpload.bind(this);

        this.state = {
            numCampaigns: 0
        };
    }

    handleUpload(){
        var name = "[test2 murban] " + this.props.selectedSavedSearchName;
        var emailCampaignActivity = {
            format_type: 5,
            from_email: this.props.account.email,
            reply_to_email: this.props.account.email,
            from_name: this.props.user.Name,
            subject: "Your Listings",
            html_content: this.props.htmlContent,
            preHeader: "Your Listings"
        };
        var that = this;
        sparkService.getConstant(this.props.selectedSavedSearch).then(function(result){
            console.log(result);
        }).catch(function(err){
            if (err && err.response && err.response.data === "not found"){
                var accessToken = memoryService.ccAccessToken();
                var constantBody = {
                    accessToken: accessToken,
                    name: name,
                    email_campaign_activities: [emailCampaignActivity]
                };
                constantService.createCampaign(JSON.stringify(constantBody)).then(function(campaign){
                    console.log(campaign);
                    var savedSearchBody = {
                        savedSearchId: that.props.selectedSavedSearch,
                        constantId: campaign.campaign_id
                    };
                    console.log(savedSearchBody);
                }).catch(function(err){
                    console.log(err);
                });
            }
        });
    }

    componentDidMount(){
        constantService.getCampaigns().then(function(campaigns){
            console.log(campaigns);
        }).catch(function(err){
            console.log(err);
        });
    }

   render(){
       return(
        <Modal
            show={this.props.show}
            onHide={this.props.onCancel}
            animation={false}
            dialogClassName="modal-60w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>
                        Upload to Constant Contact
                    </span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <Button
                            onClick={this.handleUpload}
                        >
                            Upload to Constant Contact
                        </Button>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={this.handleNext}
                >
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default UploadConstant;
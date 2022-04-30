import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Spinner,
    Form
} from 'react-bootstrap';
import constantService from '../services/constant';
import sparkService from '../services/spark';
import memoryService from '../services/memoryStorage';
import {getDomain} from '../helpers/utilities';

class UploadConstant extends React.Component {

    constructor(props){
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);

        var domain = getDomain(window.location.hostname);

        var proposedName = 
            "[" +
            domain +
            " " +
            this.props.ccAccountId +
            "] " +
             props.selectedSavedSearchName;
  
        console.log("proposedName: "+proposedName);          
        this.state = {
            numCampaigns: 0,
            successMessage: null,
            campaign_name: "",
            proposedName: proposedName 
 
        };
    }

    handleNameChange(e){
        this.setState({
            campaign_name: e.target.value
        });
    }

    handleUpload(){

        if (this.state.successMessage){
            this.handleDone();
            this.props.onCancel();
            return;
        }

        this.setState({
            loading: true
        });


        var emailCampaignActivity = {
            format_type: 5,
            from_email: this.props.account.email,
            reply_to_email: this.props.account.email,
            from_name: this.props.user.Name,
            subject: "Your Listings",
            html_content: this.props.htmlContent,
            preHeader: "Your Listings"
        };
        var accessToken = memoryService.ccAccessToken();
        var constantBody = {
            accessToken: accessToken,
            name: this.state.proposedName,
            email_campaign_activities: [emailCampaignActivity]
        };

        var that = this;
        sparkService.getConstant(this.props.selectedSavedSearch, this.props.ccAccountId).then(function(result){
            constantService.updateCampaign(result.constantId, constantBody).then(function(campaign){
                that.setState({
                    loading: false,
                    activityId: campaign.campaign_activity_id,
                    successMessage: "Email successfully updated"
                });
            }).catch(function(err){
                console.log(err);
                that.setState({ loading: false});
            });
        }).catch(function(err){
            if (err && err.response && err.response.data === "not found"){
                constantService.createCampaign(JSON.stringify(constantBody)).then(function(campaign){
                    
                    var savedSearchBody = {
                        savedSearchId: that.props.selectedSavedSearch,
                        constantId: campaign.campaign_id,
                        ccAccountId: that.props.ccAccountId
                    };

                    sparkService.createConstant(savedSearchBody).then(function(constant){
                        var activityId = null;
                        for (var i=0; i<campaign.campaign_activities.length; i++){
                            if (campaign.campaign_activities[i].role === "primary_email"){
                                activityId = campaign.campaign_activities[i].campaign_activity_id;
                            }
                        }
                        that.setState({ 
                            loading: false,
                            campaign_name: campaign.name,
                            activityId: activityId,
                            successMessage: "Email successfully created"
                        });
                    }).catch(function(err){
                        console.log(err);
                        that.setState({ 
                            loading: false
                        });
                    });
                }).catch(function(err){
                    console.log(err);
                    that.setState({ loading: false});
                });
            } else {
                console.log("other error");
                that.setState({ loading: false});
            }
        });
    }


    handleDone(){
        console.log("this.state.activityId: "+this.state.activityId);
        this.props.onNext(this.state.activityId);
    }

    componentDidMount(){
        var that = this;
        sparkService.getConstant(this.props.selectedSavedSearch, this.props.ccAccountId).then(function(result){
            console.log(result);
            constantService.getCampaign(result.constantId).then(function(campaign){
                var activityId = null;
                for (var i=0; i<campaign.campaign_activities.length; i++){
                    if (campaign.campaign_activities[i].role === "primary_email"){
                        activityId = campaign.campaign_activities[i].campaign_activity_id;
                    }
                }

                console.log(campaign);
                that.setState({
                    campaign_name: campaign.name,
                    activityId: activityId
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

   render(){
        var editName = false;
        var buttonName = "Upload Email";
        if (this.state.successMessage) buttonName = "Done";

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
            { editName ?
            <Row>
                <Form>
                    <Form.Group>
                        <Form.Label>Email name</Form.Label>
                        <Form.Control
                            value={this.state.campaign_name}
                        /> 
                    </Form.Group>
                </Form>
            </Row>
            : null }
            <Row>
                <Col>
                    { this.state.campaign_name ?
                    <p>An email with the following name will be updated.<br/>
                    <b>Email name:</b> {this.state.campaign_name}</p>
                    :
                    <p>A new email will be created with the following name:<br/>
                    <b>Email name:</b> {this.state.proposedName}
                    </p> 
                    }
                    { this.state.successMessage ?
                    <div className="pt-3 pb-3">
                        <p>{this.state.successMessage}</p>
                    </div>
                    : null }

                </Col>
            </Row>
            <Row>
            </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.props.onCancel}
                >
                    Cancel
                </Button>
                <Button
                     onClick={this.handleUpload}
                 >
                 { this.state.loading ?
                 <span><span>{buttonName}&nbsp;</span><Spinner
                     as="span"
                     animation="border"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                 /></span>
                 :
                 <span>{buttonName}</span>
                 }
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default UploadConstant;

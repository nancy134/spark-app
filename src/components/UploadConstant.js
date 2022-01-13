import React from 'react';
import {
    Modal,
    Button,
    Row,
    Col,
    Spinner
} from 'react-bootstrap';
import constantService from '../services/constant';
import sparkService from '../services/spark';
import memoryService from '../services/memoryStorage';

class UploadConstant extends React.Component {

    constructor(props){
        super(props);

        this.handleUpload = this.handleUpload.bind(this);
        this.handleDone = this.handleDone.bind(this);

        this.state = {
            numCampaigns: 0
        };
    }

    handleUpload(){
        this.setState({
            loading: true
        });
        var name = "[test8 murban] " + this.props.selectedSavedSearchName;

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
            name: name,
            email_campaign_activities: [emailCampaignActivity]
        };

        var that = this;
        sparkService.getConstant(this.props.selectedSavedSearch).then(function(result){
            constantService.updateCampaign(result.constantId, constantBody).then(function(campaign){
                that.setState({
                    loading: false,
                    constantId: result.constantId
                });
               that.setState({ loading: false});
            }).catch(function(err){
                that.setState({ loading: false});
            });
        }).catch(function(err){
            if (err && err.response && err.response.data === "not found"){
                constantService.createCampaign(JSON.stringify(constantBody)).then(function(campaign){
                    var savedSearchBody = {
                        savedSearchId: that.props.selectedSavedSearch,
                        constantId: campaign.campaign_id
                    };
                    sparkService.createConstant(savedSearchBody).then(function(constant){
                        that.setState({ 
                            loading: false,
                            campaign_name: campaign.name
                        });
                    }).catch(function(err){
                        that.setState({ loading: false});
                    });
                }).catch(function(err){
                    that.setState({ loading: false});
                });
            } else {
                that.setState({ loading: false});
            }
        });
    }


    handleDone(){
        console.log("this.state.constantId: "+this.state.constantId);
        this.props.onNext(this.state.constantId);
    }

    componentDidMount(){
        var that = this;
        sparkService.getConstant(this.props.selectedSavedSearch).then(function(result){
            console.log(result);
            constantService.getCampaign(result.constantId).then(function(campaign){
                that.setState({
                    campaign_name: campaign.name
                });
            }).catch(function(err){
                console.log(err);
            });
        }).catch(function(err){
            console.log(err);
        });
    }

   render(){
        var doneDisabled = true;
        if (this.state.constantId) doneDisabled = false;
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

                    <p>{this.state.campaign_name}</p>
                    { this.state.loading ?
                    <Spinner
                        animation="border"
                        variant="primary"
                    />
                    : null}

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
                     disabled={doneDisabled}
                     onClick={this.handleDone}
                 >
                    Done
                </Button>
            </Modal.Footer>
        </Modal>
       );
   }

}
export default UploadConstant;

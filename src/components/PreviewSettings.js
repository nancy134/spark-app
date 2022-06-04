import React from 'react';
import {
    Modal,
    Button,
    Spinner,
    Form
} from 'react-bootstrap';
import sparkService from '../services/spark';


function Templates(props){
    var options = [];
    var templates = props.templates;
    var len = props.templates.length;

    for (var i=0; i<len; i++){
        options.push(<option key={i} value={templates[i].Id}>{templates[i].Name}</option>);
    }

    return(
        <Form.Select
            onChange={props.onSelectTemplate}
            defaultValue={props.templateId}
        >
            <option key="-1" value="noTemplate">No Template</option>
            {options}
        </Form.Select>
    );

}

class PreviewSettings extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            loading: false,
            templates: null
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSelectTemplate = this.handleSelectTemplate.bind(this);
    }


    handleSelectTemplate(e){
        var that = this;
        if (e.target.value === "noTemplate"){
            that.setState({
                template: null,
                id: e.target.value 
            });
        } else {
            sparkService.getTemplate(e.target.value).then(function(template){
                that.setState({
                    id: e.target.value,
                    template: template.D.Results[0].Body
                }); 
            }).catch(function(err){
                console.log(err);
            });
        }

    }
    handleCancel(){
        this.props.onCancel();
    }

    handleSave(){
        this.props.onSave(this.state.id, this.state.template);
    }

    componentDidMount(){
        var that = this;
        sparkService.getTemplates().then(function(templates){
            that.setState({
                templates: templates.D.Results
            });
            if (that.props.templateId !== "noTemplate"){
                sparkService.getTemplate(that.props.templateId).then(function(template){
                    that.setState({
                        template: template.D.Results[0].Body
                    });
                }).catch(function(err){
                    console.log(err);
                });
            }
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
            dialogClassName="modal-80w"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    <span>Email Customization</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Use your FlexMLS Email Templates to customize your email</p>
                { this.state.templates ?
                <Templates
                    onSelectTemplate={this.handleSelectTemplate}
                    templates={this.state.templates}
                    templateId={this.props.templateId}
                />
                : null }
                { this.state.template ?
                <div
                    dangerouslySetInnerHTML={{__html: this.state.template}}
                    className="p-2 border"
                >
                </div>
                : null }
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={this.handleCancel}
                >
                    Cancel
                </Button>
                <Button
                     onClick={this.handleSave}
                 >
                 { this.state.loading ?
                 <span><span>Save&nbsp;</span><Spinner
                     as="span"
                     animation="border"
                     size="sm"
                     role="status"
                     aria-hidden="true"
                 /></span>
                 :
                 <span>Save</span>
                 }
                </Button>
            </Modal.Footer>
        </Modal>
        );
   }

}
export default PreviewSettings;

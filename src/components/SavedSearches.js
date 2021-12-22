import React from 'react';
import {
    ListGroup,
    Navbar
} from 'react-bootstrap';

function SavedSearchItem(props){
    var active = false;
    if (props.savedSearch.Id === props.selectedSavedSearch){
        active = true;
    }

    return(
       <ListGroup.Item
           active={active}
           onClick={() => props.onSavedSearchSelect(props.savedSearch.Id, props.savedSearch.Name)}
       >
           <span>{props.savedSearch.Name}</span>
       </ListGroup.Item>
    );
}

class SavedSearches extends React.Component{
    constructor(props){
        super(props);
        this.handleSavedSearchSelect = this.handleSavedSearchSelect.bind(this);
    }
 
    handleSavedSearchSelect(id, name){
        this.props.onSavedSearchSelect(id, name);
    }

    render(){

        var savedSearches = this.props.savedSearches;
        if (savedSearches){
        return(
        <React.Fragment>
            <div className="pl-1 pr-1">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>SavedSearches</Navbar.Brand>
            </Navbar>
            { savedSearches ?
            <ListGroup>
                {savedSearches.D.Results.map((savedSearch, index) =>
                (
                    <SavedSearchItem
                        index={index}
                        key={index}
                        savedSearch={savedSearch}
                        onSavedSearchSelect={this.handleSavedSearchSelect}
                        selectedSavedSearch={this.props.selectedSavedSearch}
                    />
                ))}
            </ListGroup>
            :
            <div>loadings...</div> 
            }
            </div>
        </React.Fragment>
        );
       } else {
           return(<div>loading...</div>);
       }
    }
}

export default SavedSearches;

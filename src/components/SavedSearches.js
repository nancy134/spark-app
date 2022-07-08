import React from 'react';
import {
    ListGroup,
    Navbar,
    Spinner,
    Container
} from 'react-bootstrap';
import ListPagination from '../components/ListPagination';

function SavedSearchItem(props){
    var active = false;
    if (props.savedSearch.Id === props.selectedSavedSearch){
        active = true;
    }

    return(
       <ListGroup.Item
           active={active}
           style={{cursor: "pointer"}}
           onClick={() => props.onSavedSearchSelect(props.savedSearch.Id, props.savedSearch.Name, props.mode)}
       >
           <span>{props.savedSearch.Name}</span>
       </ListGroup.Item>
    );
}

class SavedSearches extends React.Component{
    constructor(props){
        super(props);
        this.handleSavedSearchSelect = this.handleSavedSearchSelect.bind(this);
        this.handleNewSavedSearchPage = this.handleNewSavedSearchPage.bind(this);
    }
 
    handleSavedSearchSelect(id, name, mode){
        this.props.onSavedSearchSelect(id, name, mode);
    }

    handleNewSavedSearchPage(page){
        this.props.onNewSavedSearchPage(page, this.props.mode);
    }

    componentDidMount(){
        this.props.onInitialize(this.props.mode);
    }
    render(){

        var savedSearches = this.props.savedSearches;
        var loadingSavedSearches = this.props.loadingSavedSearches;
        if (savedSearches){
            var page = savedSearches.D.Pagination.CurrentPage;
            var perPage = savedSearches.D.Pagination.PageSize;
            var count = savedSearches.D.Pagination.TotalRows;
        }

        return(
        <React.Fragment>
            <div className="pl-1 pr-1">
            <Navbar bg="light" expand="lg" stick="top">
                <Container>
                <Navbar.Brand>Saved Searches</Navbar.Brand>
                </Container>
            </Navbar>
            { savedSearches ?
            <ListPagination
                page={page}
                count={count}
                perPage={perPage}
                onNewPage={this.handleNewSavedSearchPage}
            />
            : null }
            { savedSearches && !loadingSavedSearches?
            <ListGroup>
                {savedSearches.D.Results.map((savedSearch, index) =>
                (
                    <SavedSearchItem
                        mode={this.props.mode}
                        index={index}
                        key={index}
                        savedSearch={savedSearch}
                        onSavedSearchSelect={this.handleSavedSearchSelect}
                        selectedSavedSearch={this.props.selectedSavedSearch}
                        onLoginTimeout={this.props.onLoginTimeout}

                    />
                ))}
            </ListGroup>
            : null }
            { loadingSavedSearches ?
            <Spinner
                animation="border"
                variant="primary"
            />
            : null }
            </div>
        </React.Fragment>
        );
    }
}

export default SavedSearches;

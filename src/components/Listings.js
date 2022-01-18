import React from 'react';
import {
    ListGroup,
    Navbar,
    Spinner,
    Container
} from 'react-bootstrap';

const Strings = {};
Strings.orEmpty = function( entity ) {
    return entity || "";
};

function ListingItem(props){
   var f = props.listing.StandardFields;
   var address = Strings.orEmpty(f.StreetNumber) + " " +
                 Strings.orEmpty(f.StreetDirPrefix) + " " +
                 Strings.orEmpty(f.StreetName) + " " +
                 Strings.orEmpty(f.StreetSuffix) + " "  +
                 Strings.orEmpty(f.StreetDirSuffix) + " " +
                 Strings.orEmpty(f.StreetAdditionalInfo);
   var city = f.City + ", " + f.StateOrProvince;

   return(
   <ListGroup.Item
   >
       <span>{address}</span><br/>
       <span>{city}</span>
   </ListGroup.Item>
   );
}

class Listings extends React.Component{
    render(){
        var listings = null;
        if (this.props.listings){
            listings = this.props.listings.D.Results;
        }
        return(
        <React.Fragment>
            <div className="spark-listings pr-1">
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                <Navbar.Brand>Listings</Navbar.Brand>
                </Container>
            </Navbar>
            { listings && !this.props.loadingSavedSearchListings ?
            <ListGroup>
                {listings.slice(0, 7).map((listing, index) =>
                (
                    <ListingItem
                        index={index}
                        key={index}
                        listing={listing}
                    />
                ))}
            </ListGroup>
            :
            <Spinner
                animation="border"
                variant="primary"
            />
            }
            </div>
        </React.Fragment>
        );
    }
}

export default Listings;

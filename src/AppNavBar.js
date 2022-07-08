import React from 'react';
import {
    Nav,
    Navbar,
    Container
} from 'react-bootstrap';
import AccountButton from './components/AccountButton';

class AppNavBar extends React.Component {
    render(){
        //var logo = process.env.REACT_APP_IMAGES + "WebsiteLogo.png";
        return(
            <Navbar
                bg="dark"
                variant="dark"
                expand="lg"
                collapseOnSelect="true"
            >
                <Container>
                    <Navbar.Brand
                        href="/home"
                    
                    >
                       <img
                           alt=""
                           src="https://img.icons8.com/ios/50/ffffff/cottage--v1.png"
                           width="30"
                           height="30"
                           className="d-inline-block align-top"
                        />{' '}
                    Murban
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-nav-dropdown"
                        className="justify-content-end"
                    >
                        <Nav>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/savedsearches">Saved Searches</Nav.Link>
                            <Nav.Link href="/help">Help</Nav.Link>
                            <AccountButton
                                appLoading={this.props.appLoading}
                                loggingIn={this.props.loggingIn}
                                authUrl={this.props.authUrl}
                                redirect_uri={this.props.redirect_uri}
                                onLogin={this.props.onLogin}
                                onLogout={this.props.onLogout}
                                loggedIn={this.props.loggedIn}
                                user={this.props.user}
                            />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
export default AppNavBar;




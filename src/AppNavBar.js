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
       <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="./home">
            <img src="https://img.icons8.com/ios/50/ffffff/cottage--v1.png" alt="Home" />
                <span>&nbsp;Murban</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav.Item>
                <Nav.Link style={{color: "white"}} href="/home">
                        <span>Home</span>
                    </Nav.Link>
              
                </Nav.Item>

                <Nav.Item>
                <Nav.Link style={{color: "white"}} href="/savedsearches">    
                        <span>Saved Searches</span>
                    </Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link style={{color: "white"}} href="/contacts">
                        <span>Contacts</span>
                    </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link style={{color: "white"}} href="/help">
                        <span>Help</span>
                    </Nav.Link>
                </Nav.Item>


                <Nav.Item>
                    <Nav.Link eventKey="link-1">
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
                    </Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
            </Container>
        </Navbar>

        );
    }
}
export default AppNavBar;




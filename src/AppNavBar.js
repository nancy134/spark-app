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
<img src="https://img.icons8.com/ios/50/ffffff/cottage--v1.png"/>
                <span>&nbsp;Murban</span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav.Item>
                    <Nav.Link href="/home">
                        <span>Home</span>
                    </Nav.Link>
              
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/savedsearches">
                        <span>Saved Searches</span>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        <AccountButton
                            onLogin={this.props.onLogin}
                            accessToken={this.props.accessToken}
                            refreshToken={this.props.refreshToken}
                            onLogout={this.props.onLogout}
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




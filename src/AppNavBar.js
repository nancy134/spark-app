import React from 'react';
import {
    Nav,
    Navbar
} from 'react-bootstrap';
import AccountButton from './components/AccountButton';

class AppNavBar extends React.Component {
    render(){
        var logo = process.env.REACT_APP_IMAGES + "WebsiteLogo.png";
        return(
       <Navbar>
            <Navbar.Brand href="./home">
                <img
                alt="logo"
                src={logo}
                style={{height: "60px"}}
                className="p-0 d-inline-block align-top logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav.Item>
                    <Nav.Link eventKey="link-1">
                        <AccountButton
                            onLogin={this.props.onLogin}
                            accessToken={this.props.accessToken}
                            refreshToken={this.props.refreshToken}
                            onLogout={this.props.onLogout}
                        />
                    </Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
        </Navbar>

        );
    }
}
export default AppNavBar;




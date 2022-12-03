import React from 'react';
import {
    Nav,
    Navbar,
    Container
} from 'react-bootstrap';

class DownNavBar extends React.Component {
    render(){
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
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
export default DownNavBar;




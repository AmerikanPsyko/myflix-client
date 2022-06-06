import React from 'react';
import React from 'react-bootstrap';
import { Nav, Navbar, } from 'react-bootstrap';

export function Navbar() {
    
return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
<Navbar.Brand href="#home">myFlix!</Navbar.Brand>
<Navbar.Toggle aria-controls="responsive-navbar-nav" />
<Navbar.Collapse bg="dark" id="responsive-navbar-nav">
  <Nav className="me-auto"></Nav>
  <Nav>
    <Nav.Link eventKey={2} href="#memes">
      Register
    </Nav.Link>
  </Nav>
</Navbar.Collapse>
</Navbar>

);
}





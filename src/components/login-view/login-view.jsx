import React, { useState } from "react";
import "./login-view.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Nav } from "react-bootstrap";


export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Container className="main">
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

      <Container className="form">
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Container>
    </Container>
  );
}

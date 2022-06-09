import React, { useState } from "react";
import "./login-view.scss";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";



export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://cfmyflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return (
    <Container className="main">
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className="nav-brand" href="#home">myFlix!</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse bg="dark" id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
      <Nav className="nav-button"><button onClick={() => { this.onLoggedOut() }}>Logout</button></Nav>
      <Nav className="nav-button">
          <button>Register</button>
            
          
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

// import React from "react";
// import './navbar-view.scss';
// import { Navbar, Container, Nav, Button, Offcanvas, NavDropdown, Form, FormControl } from 'react-bootstrap';
// import { Link } from "react-router-dom";

// export function NavbarView({ user }) {

//   const onLoggedOut = () => {
//     localStorage.clear();
//     window.open("/", "_self");
//   }

//   const isAuth = () => {
//     if (typeof window == "undefined") {
//       return false
//     }
//     if (localStorage.getItem("token")) {
//       return localStorage.getItem("token");
//     } else {
//       return false;
//     }
//   };

//   return (
//     <Container>
//       <Navbar bg="light" expand="lg">
//         <Container className="navbar-container">
//           <Navbar.Brand as={Link} to={"/"} href="#home">MyFlix-App</Navbar.Brand>

//           <Nav className="me-auto navbar-elements__style">

//             {isAuth() && (
//               <Nav.Link as={Link} to={`/`}>Movies</Nav.Link>
//             )}

//             {isAuth() && (
//               <Nav.Link as={Link} to={`/users/${user}`}>Profile</Nav.Link>
//             )}

//             {isAuth() && (
//               <Nav.Link onClick={() => onLoggedOut()}>Logout</Nav.Link>
//             )}

//             {!isAuth() && (
//               <Nav.Link as={Link} to={`/`}>Login</Nav.Link>
//             )}

//             {!isAuth() && (
//               <Nav.Link as={Link} to={`/register`}>Sign Up</Nav.Link>
//             )}

//           </Nav>

//         </Container>
//       </Navbar>
//     </Container>

//   )
// }

import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../actions/actions";

import "./navbar-view.scss";

export function NavbarView({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar
      className="main-nav"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          CFMyflix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link as={Link} to={`/`}>
                Movies
              </Nav.Link>
            )}

            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Log In</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign Up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};

export default connect(mapStateToProps, { setUser })(NavbarView);

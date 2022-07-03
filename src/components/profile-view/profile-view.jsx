import React, { useEffect, useState, Fragment } from "react";
import "./profile-view.scss";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { Modal } from "react-bootstrap";

export function ProfileView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [show, setShow] = useState(false); // setting the state for the deleteUser modal
  const token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    let user = localStorage.getItem("user");
    axios
      .get(`https://cfmyflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setFavouriteMovies(response.data.Favorites);
        console.log(response.data);
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  // Update users info
  const updateUser = () => {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .put(
        `https://cfmyflix.herokuapp.com/users/${user}`,
        {
          Username: username,
          Email: email,
          Birthday: birthday,
          Password: password,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        alert("Your profile has been updated");
        localStorage.setItem("user", response.data.Username),
          console.log(response.data);
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  //Delete User
  const deleteUser = () => {
    setShowModal(false);

    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    axios
      .delete(`https://cfmyflix.herokuapp.com/users/${user}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Your profile has been deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("Error");
      });
  };

  //Render Favorite Movies
  const renderFavorites = () => {
    console.log(props.movies);
    let movies = props.movies;
    const favoriteMoviesList = movies.filter((m) => {
      return favouriteMovies.includes(m._id);
    });
    console.log("favoriteMoviesList ", favoriteMoviesList);
    if (favoriteMoviesList.length > 0) {
      return (
        <Row className="justify-content-md-center">
          {favoriteMoviesList.length === 0 ? (
            <h5>Add some movies to your list</h5>
          ) : (
            favoriteMoviesList.map((favMovie) => (
              <Col md={6} lg={4} key={favMovie._id}>
                <MovieCard movie={favMovie} />
              </Col>
            ))
          )}
        </Row>
      );
    }
  };
  // Functions needed to open and close the modal (below) to delete a user
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function that contains the modal to delete a users account
  const cancelUserModal = () => {
    return (
      <>
        <Modal
          style={{ background: "transparent" }}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete your Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={deleteUser}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  return (
    <>
      <Container>
        <h1>Profile Page</h1>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              type="text"
              placeholder="username"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter new email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="birthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              onChange={(e) => setBirthday(e.target.value)}
              value={birthday}
              type="date"
              placeholder="birthday"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
              placeholder="Password"
            />
          </Form.Group>
          <Button variant="warning" onClick={updateUser}>
            Update you profile
          </Button>

          <Button className="deleteButton" variant="link" onClick={handleShow}>
            Delete your profile
          </Button>
        </Form>

        {cancelUserModal()}
        <p></p>
        <h2>Favourite Movies:</h2>

        {renderFavorites()}
      </Container>
    </>
  );
}

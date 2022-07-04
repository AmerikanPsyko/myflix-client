import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState, setState } from 'react';

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      FavoriteMovies: [],
    };
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://cfmyflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //assign the result to the state
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch((e) => console.log(e));
  }

 


 

  
  // Add a movie to favourite movies
  addFavMovie(movie) {
    console.log(movie);
    const currentUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://cfmyflix.herokuapp.com/users/${currentUser}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(
          `${this.props.movie.Title} has been added to your list of movies`
        );
      })
      .catch((error) => console.error(error));
  }

  // Delete a movie from Favourite movies
  removeFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    axios.delete(`https://cfmyflix.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }).then((response) => {
        console.log(response.data);
        alert(
          `${this.props.movie.Title} has been removed from your list of movies`
        );
        window.open(`/movies/${this.props.movie._id}`, "_self");
      })
      .catch(e => {
        console.log('Error')
      });
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies, username, password, email, birthday } = this.state;
    let userFavMovies = this.state.FavoriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);

    return (
      <Container>
        <Row>
          <Col>
            <Card className="movie-view__card" style={{ width: "28rem" }}>
              <Card.Body>
                <Card.Img
                  className="movie-view__image"
                  variant="top"
                  src={movie.ImageURL}
                />
                <Card.Title className="title-style text-info">{movie.Title}</Card.Title>

                <Card.Text className="text-style">
                  Genre: {movie.Genre.Name}
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">
                  Director: {movie.Director.Name}
                  <Link to={`/directors/${movie.Director.Name}`}>
                    <Button variant="link">more info</Button>
                  </Link>
                </Card.Text>

                <Card.Text className="text-style">
                  {movie.Description}
                </Card.Text>
                <Button
                  variant="danger"
                  onClick={() => {
                    onBackClick();
                  }}
                >
                  Back
                </Button>
                

                {!isFav && (
                  <Button
                    className="add-list__button"
                    variant="danger"
                    onClick={() => this.addFavMovie(movie)}
                  >
                    Add to your list
                  </Button>
                )}
                   {!isFav && (
                  <Button
                    className="add-list__button"
                    variant="danger"
                    onClick={() => this.removeFavMovie(movie)}
                  >
                    Remove from Favorites
                  </Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

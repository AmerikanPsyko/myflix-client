import React from "react";
import propTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    
     
    


    return (
      
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} />
          <Card.Body className="body">
            <Card.Title><h2 className="h2-title">{movie.Title}</h2></Card.Title>
            <Card.Text><h4 className="h4-text">{movie.Description}</h4></Card.Text>
            <Button className="button-open" onClick={() => onMovieClick(movie)} variant="link">
              Open
            </Button>
          </Card.Body>
        </Card>
      
    );


  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: propTypes.func.isRequired,
};
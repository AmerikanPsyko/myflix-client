import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Carousel } from 'react-bootstrap';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="card-style" style={{ width: '18rem' }}>
        <Card.Img variant="top" className="image-style" src={movie.ImageURL} />
        <Card.Body>
          <Card.Title className="title-style text-danger">{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button-style" variant="danger">Open</Button>
          </Link>
        </Card.Body>
      </Card>




    );
  }
}



MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};
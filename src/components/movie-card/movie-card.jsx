import React from 'react';
import propTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
      const { movie, onMovieClick } = this.props;
  
      return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
    }
  }

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Genre: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Feature: propTypes.bool.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };

  
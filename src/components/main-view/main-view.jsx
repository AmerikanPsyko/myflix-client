import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { NavbarView } from "../navbar/navbar-view";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";
import { connect } from 'react-redux';

// we haven't written this one yet
import MoviesList from "../movies-list/movies-list";
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

class MainView extends React.Component {
  //   constructor() {
  //     super();
  //     this.state = {
  //     user: null
  //     };
  //   }

  getMovies(token) {
    axios
      .get("https://cfmyflix.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.props.setUser(localStorage.getItem("user"));
    }
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  onLoggedIn(authData) {
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    const { setUser } = this.props;
    setUser(authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.props.setUser("");
  }

  // componentDidMount() {
  //   let accessToken = localStorage.getItem("token");
  //   if (accessToken !== null) {
  //     this.setState({
  //       user: localStorage.getItem("user"),
  //     });
  //     this.getMovies(accessToken);
  //   }
  // }

  // onLoggedIn(authData) {
  //   console.log(authData);
  //   this.setState({
  //     user: authData.user.Username,
  //   });

  //   localStorage.setItem("token", authData.token);
  //   localStorage.setItem("user", authData.user.Username);
  //   this.getMovies(authData.token);
  // }

  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.props.setUser('');
  // }

  render() {
    const { movies, user } = this.props;

    return (
      <Router>
        <NavbarView user={user} />

        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              // #6
              return <MoviesList movies={movies} />;
            }}
          />

          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* route for link on main-view to profile-view */}
          <Route
            path={`/users/${user}`}
            render={({ match, history }) => {
              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    user={user}
                    history={history}
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies })(MainView);

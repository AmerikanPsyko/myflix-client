import React from "react";
import axios from "axios";
import "./main-view.scss";



import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Nav, Navbar } from "react-bootstrap";
// import { Navbar } from "../nav/navbar";



import { RegistrationView } from "../reg-view/reg-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  // onLoggedIn(user) {
  //   this.setState({
  //     user,
  //   });
  // }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://cfmyflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    

    return (
        
    
      
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        
        {/* <Navbar />; */}
        {/* <button onClick={() => { this.onLoggedOut() }}>Logout</button>; */}

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
        
        {selectedMovie ? (
          <Row className="justify-content-md-center">
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          </Row>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
   
    );
  }
}


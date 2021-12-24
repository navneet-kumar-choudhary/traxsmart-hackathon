import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import { Switch, Route } from "react-router";
import NavBar from "./Component/NavBar";
import Login from "./Component/Login";
import New from "./Component/New";
import MoviePage from "./Component/MoviePage";

export default class App extends Component {
  state = {
    movies: [],
  };
  deleteEntry = (id) => {
    let filteredMovies = this.state.movies.filter((movieObj) => {
      return movieObj._id != id;
    });
    this.setState({
      movies: filteredMovies,
    });
  };

  async componentDidMount() {
    let resp = await fetch("http://react-backend101.herokuapp.com/movies");
    let jsonMovies = await resp.json();
    this.setState({
      movies: jsonMovies.movies,
    });
  }

  addMovie = (obj) => {
    let { title, genre, stock, rate } = obj;
    let genreObj = [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
    ];
    for (let i = 0; i < genreObj.length; i++) {
      if (genreObj[i].name == genre) {
        genre = genreObj[i];
      }
    }
    let movieObj = {
      _id: Date.now(),
      title,
      genre,
      dailyRentalRate: rate,
      numberInStock: stock,
    };
    let copyOfMovies = [...this.state.movies, movieObj];
    this.setState({
      movies: copyOfMovies,
    });
  };

  render() {
    return (
      <>
        <NavBar></NavBar>
        <Switch>
          <Route
            path="/new" 
            render={(props) => {
              return (<New {...props} addMovie={this.addMovie}></New>);
            }}>
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/"
            exact
            render={(props) => {
              return (
                <MoviePage
                  {...props}
                  deleteEntry={this.deleteEntry}
                  movies={this.state.movies}
                ></MoviePage>
              );
            }}
          ></Route>
        </Switch>
      </>
    );
  }
}

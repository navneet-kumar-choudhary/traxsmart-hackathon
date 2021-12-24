import React, { Component } from "react";
import { Link } from "react-router-dom";
import List from "./List";
import Pagination from "./Pagination";

export default class MoviePage extends Component {
  state = {
    genres: [{ id: 1, name: "All Genres" }],
    currSearchText: "",
    limit: 4,
    currentPage: 1,
    cGenre: "All Genres",
  };
  setCurrentText = (e) => {
    let task = e.target.value;
    this.setState({
      currSearchText: task,
    });
  };

  sortByRatings = (e) => {
    let className = e.target.className;
    let sortedMovies;
    let { movies } = this.props;
    if (className == "fas fa-sort-up") {
      sortedMovies = movies.sort((movieObjA, movieObjB) => {
        return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate;
      });
    } else {
      sortedMovies = movies.sort((movieObjA, movieObjB) => {
        return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };

  sortByStock = (e) => {
    let className = e.target.className.trim();
    let sortedMovies;
    let { movies } = this.props;
    if (className == "fas fa-sort-up") {
      sortedMovies = movies.sort((movieObjA, movieObjB) => {
        return movieObjA.numberInStock - movieObjB.numberInStock;
      });
    } else {
      sortedMovies = movies.sort((movieObjA, movieObjB) => {
        return movieObjB.numberInStock - movieObjA.numberInStock;
      });
    }
    this.setState({
      movies: sortedMovies,
    });
  };
  changelimit = (e) => {
    let currLimit = e.target.value;
    if (currLimit < 1) {
      return;
    }
    this.setState({
      limit: currLimit,
    });
  };
  changeCurrentPage = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };
  groupbygenre = (name) => {
    this.setState({
      cGenre: name,
      currSearchText: "",
    });
  };
  async componentDidMount() {
    let resp = await fetch("http://react-backend101.herokuapp.com/genres");
    let jsonGenres = await resp.json();
    this.setState({
      genres: [...this.state.genres, ...jsonGenres.genres],
    });
  }

  render() {
    let { currSearchText, limit, currentPage, genres, cGenre } = this.state;
    let { movies, deleteEntry } = this.props;
    let filteredArr = movies;
    if (cGenre != "All Genres") {
      filteredArr = filteredArr.filter((movieObj) => {
        return movieObj.genres.name == cGenre;
      });
    }
    if (currSearchText != "") {
      filteredArr = filteredArr.filter((movieObj) => {
        let title = movieObj.title.trim().toLowerCase();
        return title.includes(currSearchText.toLocaleLowerCase());
      });
    }
    let numberofpage = Math.ceil(filteredArr.length / limit);
    let si = (currentPage - 1) * limit;
    let eidx = si + limit;
    filteredArr = filteredArr.slice(si, eidx);

    return (
      <div className="row">
        <div className="col-3">
          <List genres={genres} groupbygenre={this.groupbygenre}></List>
        </div>
        <div className="col-9">
          <button className="btn btn-primary">
            <Link to="/new" className="text-light">
              New
            </Link>
          </button>
          <input
            type="search"
            value={currSearchText}
            onChange={this.setCurrentText}
          ></input>
          <input
            type="number"
            className="col-1"
            placeholder="no of elements/page"
            value={limit}
            onChange={this.changelimit}
          ></input>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">
                  <i className="" onClick={this.sortByStock}>
                    Stock
                  </i>
                  <i
                    className="fas fa-sort-down"
                    onClick={this.sortByStock}
                  ></i>
                </th>
                <th scope="col">
                  <i className="fas fa-sort-up" onClick={this.sortByRatings}>
                    Ratings
                  </i>
                  <i
                    className="fas fa-sort-down"
                    onClick={this.sortByRatings}
                  ></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredArr.map((movieObj) => {
                return (
                  <tr scope="row" key={movieObj._id}>
                    <td></td>
                    <td>{movieObj.title}</td>
                    <td>{movieObj.genre.name}</td>
                    <td>{movieObj.numberInStock}</td>
                    <td>{movieObj.dailyRentalRate}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          deleteEntry(movieObj._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            numberofpage={numberofpage}
            currentPage={currentPage}
            changeCurrentPage={this.changeCurrentPage}
          ></Pagination>
        </div>
      </div>
    );
  }
}

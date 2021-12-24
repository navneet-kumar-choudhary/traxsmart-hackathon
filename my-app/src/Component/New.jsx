import React, { Component } from "react";

export default class New extends Component {
  state = {
    data: {
      title: "",
      genre: "",
      stock: "",
      rate: "",
    },
  };
  handelSubmit = (e) => {
    e.preventDefault();
    this.props.addMovie(this.state.data);
  };
  handelChange = (e) => {
    let id = e.currentTarget.id;
    let value = e.target.value;
    let newObject = { ...this.state.data };
    newObject[id] = value;
    this.setState({
      data: newObject,
    });
  };

  render() {
    let { title, genre, stock, rate } = this.state.data;
    return (
      <div>
        <form onSubmit={this.handelSubmit}>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              value={title}
              onChange={this.handelChange}
            />
          </label>

          <label htmlFor="genre">
            Genre
            <select id="genre" value={genre} onChange={this.handelChange}>
              <option value=""></option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
            </select>
          </label>
          <label htmlFor="stock">
            Stock
            <input
              type="number"
              id="stock"
              value={stock}
              onChange={this.handelChange}
            ></input>
          </label>
          <label htmlFor="rate">
            Rate
            <input
              type="number"
              id="rate"
              value={rate}
              onChange={this.handelChange}
            ></input>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

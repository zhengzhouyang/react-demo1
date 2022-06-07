import "./App.css";
import React, { Component } from "react";
import Movie from "./components/Movie";
import { Container, Row, Col } from "react-bootstrap";
import Navigation from "./components/Navgiation";
import SingleMoviePage from "./components/SingleMoviePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "batman",
      movies: [],
      isLoaded: false,
      error: null,
      pageName: "",
    };
  }

  searchForMovie = (movieTitle) => {
    let apikey = "cccbc2f6";

    const mT = movieTitle === null ? this.state.title : movieTitle;

    const url =
      "https://www.omdbapi.com/?apikey=" + apikey + "&s=" + mT + "&page=2";
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.Response === "False")
            this.setState({ error: result.Error });
          this.setState({ movies: result.Search, isLoaded: true });
        },
        (error) => {
          this.setState({ isLoaded: true, error: error });
        }
      );

    if (this.state.error !== null) {
      console.log("error" + this.state.error.message);
    }
  };

  componentDidMount() {
    this.searchForMovie(null);
  }

  getMovie = (movie, index) => {
    return (
      <Col>
        <Movie
          key={this.state.movies[index].imdbID}
          details={movie}
          changePage={this.changePage}
        ></Movie>
      </Col>
    );
  };

  changePage = (pageName, title = "batman") => {
    this.setState({
      pageName: pageName,
      title: title,
    });
  };

  searchMovie = (title) => {
    if (title.length < 3) {
      alert("Movie title needs to be more than 3 characters");
      // return;
    }

    if (title) {
      this.setState({
        title: title,
      });
      this.searchForMovie(title);
    } else {
      alert("Please enter some search text!");
    }
  };

  render() {
    const { error, isLoaded, movies, pageName } = this.state;
    console.log(pageName);
    if (pageName === "singleMoviePage") {
      return (
        <SingleMoviePage
          changePage={this.changePage}
          title={this.state.title}
          movie={this.state.movies}
        ></SingleMoviePage>
      );
    } else {
      if (error) {
        return (
          <Container>
            <Navigation
              changePage={this.changePage}
              searchMovie={this.searchMovie}
            ></Navigation>
            <div>Error:{error}</div>
          </Container>
        );
      } else if (!isLoaded) {
        return (
          <Container>
            <div>Loading.....</div>
          </Container>
        );
      } else {
        return (
          <div className="App">
            <Navigation
              changePage={this.changePage}
              searchMovie={this.searchMovie}
            ></Navigation>

            <header className="App-header">
              <Container>
                <Row>{this.state.movies.map(this.getMovie)}</Row>
              </Container>
            </header>
          </div>
        );
      }
    }
  }
}

export default App;

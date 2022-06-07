import React, { Component } from "react";
import Navigation from "./Navgiation";
import { Container, Row, Col, Image, Badge } from "react-bootstrap";

class SingleMoviePage extends Component {
  constructor() {
    super();
    this.state = {
      movie: [],
    };
  }

  searchForMovie = () => {
    let apikey = "cccbc2f6";

    const url =
      "https://www.omdbapi.com/?apikey=" + apikey + "&t=" + this.props.title;
    console.log(url);

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ movie: result, isLoaded: true });
        },
        (error) => {
          this.setState({ isLoaded: true, error: error });
        }
      );
  };

  componentDidMount() {
    this.searchForMovie();
  }

  ratingColor() {
    const rating = parseFloat(this.state.movie.imdbRating);
    return rating >= 6 ? "success" : "danger";
  }

  render() {
    const { movie } = this.state;

    return (
      <div>
        <Navigation changePage={this.props.changePage}></Navigation>
        <Container className="mt-5">
          <Row>
            <Col xs={12} md={4}>
              <Image src={movie.Poster} alt="N/A"></Image>
            </Col>
            <Col xs={12} md={8} lg={7}>
              <h2>{movie.Title}</h2>
              <div>Year:{movie.Year}</div>
              <p>{movie.Genre}</p>
              <p>Storyline:{movie.Plot}</p>
              <p>{movie.Country}</p>
              <p>Released:{movie.Released}</p>
              <div>{movie.Language}</div>
              <span>Runtime:{movie.Runtime}</span>
              <div>
                Rating:
                <Badge bg={this.ratingColor()}>{movie.imdbRating}</Badge>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default SingleMoviePage;

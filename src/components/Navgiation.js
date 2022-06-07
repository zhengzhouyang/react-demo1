import React, { Component } from "react";
import {
  Nav,
  Navbar,
  Container,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";

class Navigation extends Component {
  constructor() {
    super();
    this.titleInput = React.createRef();
    this.state = {
      title: null,
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const title = this.titleInput.current.value;
    this.setState({ title: title });
  };

  handleSubmit = (e) => {
    console.log(e);
    console.log(e.target);
    console.log(this.titleInput);
  };

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Nav className="me-auto">
            <Nav.Link
              href="#"
              onClick={() => {
                this.props.changePage("");
              }}
            >
              Home
            </Nav.Link>
          </Nav>
          <Form>
            <Row className="align-items-center">
              <Col xs={4} md={6} lg={8} className="my-1">
                <Form.Control
                  className="mr-sm-2"
                  onChange={this.handleChange}
                  ref={this.titleInput}
                  placeholder="Batman"
                />
              </Col>

              <Col xs="auto" className="my-1">
                <Button
                  onClick={() => this.props.searchMovie(this.state.title)}
                  variant="success"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Navbar>
    );
  }
}

export default Navigation;

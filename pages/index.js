import React from "react"
import Router from "next/router"
import { Input, Row, Col, Label, Container, Button } from "reactstrap"
import axios from "axios"
import _ from "lodash"
import SearchResults from "../components/SearchResults"
import "../style/index.css"
import "bootstrap/dist/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

class Index extends React.Component {
  state = {
    results: [],
    search: "",
    searchType: "faculty",
  }

  onSearchChange = e => {
    this.setState({ search: e.target.value })
  }

  onRadioChange = e => {
    this.setState({ searchType: e.target.value })
  }

  onSearch = () => {
    const { search, searchType } = this.state
    if (search) {
      axios
        .get(`${API_URL}/${searchType}/search/${search}`)
        .then(response => {
          this.setState({ results: response.data })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      console.log("Please enter input ")
    }
  }

  render() {
    const { results, searchType } = this.state
    return (
      <div>
        <header className="shadow">
          <br />
          <Row>
            <Col md="1">
              <img
                src="../static/logo.svg"
                style={{
                  marginBottom: 20,
                  marginLeft: 20,
                  width: 35,
                  height: "auto",
                }}
              />
            </Col>
            <Col md="3">
              <Input
                placeholder="Search"
                name="search"
                type="text"
                onChange={this.onSearchChange}
                style={{ width: 350, borderRadius: 20 }}
              />
            </Col>
            <Col md="4">
              <Button
                outline
                color="primary"
                onClick={this.onSearch}
                style={{ borderRadius: 30, marginRight: 20 }}
              >
                Search
              </Button>
              <Label check for="byFaculty" style={{ marginLeft: 30 }}>
                <Input
                  onChange={this.onRadioChange}
                  style={{ marginRight: 10 }}
                  type="radio"
                  value="faculty"
                  className="form-check-input"
                  name="searchType"
                />
                by Faculty Name
              </Label>
              <Label check for="byCollege" style={{ marginLeft: 30 }}>
                <Input
                  onChange={this.onRadioChange}
                  style={{ marginRight: 10 }}
                  className="form-check-input"
                  name="searchType"
                  type="radio"
                  value="college"
                  required
                />
                by College
              </Label>
            </Col>
            <Col md={{ size: 1, offset: 3 }}>
              <Button
                outline
                color="primary"
                onClick={() => Router.push("/signin")}
              >
                Sign In
              </Button>
            </Col>
          </Row>
        </header>
        <br />
        <Container className="results">
          {!results ? (
            ""
          ) : (
            <SearchResults type={searchType} results={results} />
          )}
        </Container>
      </div>
    )
  }
}

export default Index

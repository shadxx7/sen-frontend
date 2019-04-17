import React from "react"
import { Input, Row, Col, Label, Container, Button } from "reactstrap"
// import { Formik, Field, Form } from "formik"
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
            <Col md="2">Faculty Directory</Col>
            <Col md="3">
              <Input
                className="form-control"
                placeholder="Search"
                name="search"
                type="text"
                onChange={this.onSearchChange}
                style={{ width: 350, borderRadius: 20 }}
              />
            </Col>
            <Col md="4">
              <Button
                color="primary"
                onClick={this.onSearch}
                style={{ borderRadius: 20, marginRight: 20 }}
              >
                Search
              </Button>
              <Label check for="byFaculty" style={{ marginRight: 30 }}>
                by Faculty Name
                <Input
                  onChange={this.onRadioChange}
                  style={{ marginLeft: 10 }}
                  type="radio"
                  value="faculty"
                  className="form-check-input"
                  name="searchType"
                />
              </Label>
              <Label check for="byCollege" style={{ marginRight: 30 }}>
                by College
                <Input
                  onChange={this.onRadioChange}
                  style={{ marginLeft: 10 }}
                  className="form-check-input"
                  name="searchType"
                  type="radio"
                  value="college"
                  required
                />
              </Label>
            </Col>
          </Row>
        </header>
        <br />
        <Container>
          {!results ? (
            <React.Fragment />
          ) : (
            <SearchResults type={searchType} results={results} />
          )}
        </Container>
      </div>
    )
  }
}

export default Index

{
  /* <Formik
initialValues={{ search: "", searchType: "" }}
onSubmit={this.onSearch}
render={() => (
  <Form>
    <div className="form-group">
      <Field
        className="form-control"
        placeholder="Search"
        name="search"
        type="text"
        style={{ width: 400, borderRadius: 20 }}
      />
    </div>
    <div className="form-group">
      <Label check for="byFaculty" style={{ marginRight: 30 }}>
        by Faculty Name
        <Field
          style={{ marginLeft: 10 }}
          type="radio"
          value="faculty"
          className="form-check-input"
          name="searchType"
          required
          checked
        />
      </Label>
      <Label check for="byCollege" style={{ marginRight: 30 }}>
        by College
        <Field
          style={{ marginLeft: 10 }}
          className="form-check-input"
          name="searchType"
          type="radio"
          value="college"
          required
        />
      </Label>
      <Button type="submit">Search</Button>
    </div>
  </Form>
)}
/> */
}

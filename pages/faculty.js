import React from "react"
import Router from "next/router"
import { Button, Container, Row, Col } from "reactstrap"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const FacultyPage = props => {
  console.log(props.data)
  return (
    <div>
      <Button
        color="link"
        onClick={() => {
          Router.back()
        }}
      >
        Back
      </Button>
      <Container>
        <br />
        <Row>
          <Col>
            <h1 className="display-3">Professor {props.data.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>{props.data.college.name}</h2>
          </Col>
        </Row>
        <br />
        <dl class="row">
          <dt class="col-sm-3">Department</dt>
          <dd class="col-sm-9">{props.data.department}</dd>
          <dt class="col-sm-3">Area of Interests</dt>
          <dd class="col-sm-9">
            {props.data.areaOfInterests.map(aoi => {
              return `${aoi.name} `
            })}
          </dd>
          <dt class="col-sm-3">Publications</dt>
          <dd class="col-sm-9">
            {props.data.publications
              ? props.data.publications.map(publication => {
                  return (
                    <Row>
                      <Col>{publication.name}</Col>
                    </Row>
                  )
                })
              : "Nothing here.."}
          </dd>
          <dt class="col-sm-3 text-truncate">Courses Taught</dt>
          <dd class="col-sm-9">
            {props.data.coursesTaught
              ? props.data.coursesTaught.map(course => {
                  return (
                    <Row>
                      <Col>{course.name}</Col>
                    </Row>
                  )
                })
              : "Nothing here.."}
          </dd>
        </dl>
      </Container>
    </div>
  )
}

FacultyPage.getInitialProps = async props => {
  return axios.get(`${API_URL}/faculty/${props.query.id}`).then(response => {
    return { data: response.data }
  })
}

export default FacultyPage

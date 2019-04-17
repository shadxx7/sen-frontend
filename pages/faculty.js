import React from "react"
import Link from "next/link"
import { Jumbotron, Container, Row, Col } from "reactstrap"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const FacultyPage = props => {
  console.log(props.data)
  return (
    <div>
      <Link href="/">Back</Link>
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
        <Row>
          <Col>Area of Interests:</Col>
        </Row>
        <Row>
          <Col>
            {props.data.areaOfInterests.map(aoi => {
              return `${aoi.name} `
            })}
          </Col>
        </Row>
        <Row>
          <Col>Publications:</Col>
        </Row>
        <Row>
          <Col>
            {props.data.publications
              ? props.data.publications.map(publication => {
                  return (
                    <Row>
                      <Col>{publication.name}</Col>
                    </Row>
                  )
                })
              : "Nothing here.."}
          </Col>
        </Row>
        <Row>
          <Col>Courses Taught:</Col>
        </Row>
        <Row>
          <Col>
            {props.data.coursesTaught
              ? props.data.coursesTaught.map(course => {
                  return (
                    <Row>
                      <Col>{course.name}</Col>
                    </Row>
                  )
                })
              : "Nothing here.."}
          </Col>
        </Row>
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

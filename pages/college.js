import React from "react"
import Router from "next/router"
import Link from "next/link"
import {
  Button,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

const CollegePage = props => {
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
            <h1 className="display-3">{props.data.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2>
              {props.data.location.city}, {props.data.location.country}
            </h2>
          </Col>
        </Row>
        <h2>Faculties</h2>
        <br />
        <ListGroup flush>
          {props.data.faculty.map(faculty => {
            return (
              <ListGroupItem style={{ width: 400 }}>
                <Link href={`/faculty?id=${faculty.id}`}>
                  <a>{faculty.name}</a>
                </Link>
              </ListGroupItem>
            )
          })}
        </ListGroup>
      </Container>
    </div>
  )
}

CollegePage.getInitialProps = async props => {
  return axios.get(`${API_URL}/college/${props.query.id}`).then(response => {
    return { data: response.data }
  })
}

export default CollegePage

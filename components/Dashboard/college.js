import React from "react"
import { Row, Col, Button, Nav, NavItem } from "reactstrap"
import FacultyForm from "../Forms/faculty"
import FacultyList from "../Lists/faculty"

const signOut = () => {
  sessionStorage.removeItem("TOKEN")
  sessionStorage.removeItem("COLLEGE_ID")
  sessionStorage.removeItem("COLLEGE_NAME")
  window.location.href = "/signin"
}

const CollegeAdmin = () => {
  const [element, setElement] = React.useState(<FacultyForm />)

  return (
    <React.Fragment>
      <Row>
        <Col md={{ size: 2, offset: 10 }}>
          <Button color="primary" onClick={signOut}>
            Sign Out
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md="2">
          <Nav vertical>
            <NavItem>
              <Button
                color="link"
                onClick={() => {
                  setElement(<FacultyForm />)
                }}
              >
                Add Faculty
              </Button>
            </NavItem>
            <NavItem>
              <Button
                color="link"
                onClick={() => {
                  setElement(<FacultyList />)
                }}
              >
                Faculty List
              </Button>
            </NavItem>
          </Nav>
        </Col>
        <Col md="4">
          <Col>{element}</Col>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CollegeAdmin

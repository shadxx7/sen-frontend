import React from "react"
import { Row, Col, Button } from "reactstrap"
import FacultyForm from "../Forms/faculty"
import FacultyList from "../Lists/faculty"
import "./style.css"

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
        <Col md="2">
          <div className="sidenav">
            <Button
              className="item"
              color="link"
              onClick={() => {
                setElement(<FacultyForm />)
              }}
            >
              Add Faculty
            </Button>
            <Button
              className="item"
              color="link"
              onClick={() => {
                setElement(<FacultyList />)
              }}
            >
              Faculty List
            </Button>
            <Button className="signout" color="primary" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </Col>

        <Col md="6">
          <div className="element">{element}</div>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CollegeAdmin

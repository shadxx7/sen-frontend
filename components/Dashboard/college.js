import React from "react"
import { Row, Col, Button } from "reactstrap"
import Link from "next/link"
import FacultyForm from "../Forms/faculty"
import FacultyList from "../Lists/faculty"
import "./style.css"

const signOut = () => {
  sessionStorage.removeItem("TOKEN")
  sessionStorage.removeItem("COLLEGE_ID")
  sessionStorage.removeItem("COLLEGE_NAME")
  window.location.href = "/signin"
}

class CollegeAdmin extends React.Component {
  state = { element: "" }

  componentDidMount() {
    if (this.props.element === "list") {
      this.setState({ element: <FacultyList /> })
    } else if (this.props.element === "form") {
      this.setState({ element: <FacultyForm /> })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.element === "list") {
        this.setState({ element: <FacultyList /> })
      } else if (this.props.element === "form") {
        this.setState({ element: <FacultyForm /> })
      }
    }
  }

  render() {
    const { element } = this.state
    return (
      <React.Fragment>
        <Row>
          <Col md="2">
            <div className="sidenav">
              <Link href={`/admin?type=college&element=form`}>
                <a className="item">Add Faculty</a>
              </Link>
              <Link href={`/admin?type=college&element=list`}>
                <a className="item">Faculty List</a>
              </Link>
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
}

export default CollegeAdmin

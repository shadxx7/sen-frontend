import { Row, Col, Button, Nav, NavItem } from "reactstrap"
import CollegeForm from "../Forms/college"
import CollegeList from "../Lists/college"
import "./style.css"

const signOut = () => {
  sessionStorage.removeItem("TOKEN")
  window.location.href = "/signin"
}

const SystemAdmin = () => {
  const [element, setElement] = React.useState(<CollegeForm />)
  return (
    <React.Fragment>
      <Row>
        <Col md="2">
          <div className="sidenav" vertical>
            <Button
              className="item"
              color="link"
              onClick={() => {
                setElement(<CollegeForm />)
              }}
            >
              Add College
            </Button>
            <Button
              className="item"
              color="link"
              onClick={() => {
                setElement(<CollegeList />)
              }}
            >
              College List
            </Button>
            <Button className="signout" color="primary" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </Col>
        <Col md="6">
          <Col>
            <div className="element">{element}</div>
          </Col>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SystemAdmin

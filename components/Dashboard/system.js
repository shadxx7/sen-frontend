import { Row, Col, Button, Nav, NavItem } from "reactstrap"
import CollegeForm from "../Forms/college"
import CollegeList from "../Lists/college"

const signOut = () => {
  sessionStorage.removeItem("TOKEN")
  window.location.href = "/signin"
}

const SystemAdmin = () => {
  const [element, setElement] = React.useState(<CollegeForm />)
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
                  setElement(<CollegeForm />)
                }}
              >
                Add College
              </Button>
            </NavItem>
            <NavItem>
              <Button
                color="link"
                onClick={() => {
                  setElement(<CollegeList />)
                }}
              >
                College List
              </Button>
            </NavItem>
          </Nav>
        </Col>
        <Col md="6">
          <Col>{element}</Col>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SystemAdmin

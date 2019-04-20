import { Row, Col, Button } from "reactstrap"
import Link from "next/link"
import CollegeForm from "../Forms/college"
import CollegeList from "../Lists/college"
import "./style.css"

const signOut = () => {
  sessionStorage.removeItem("TOKEN")
  window.location.href = "/signin"
}

class SystemAdmin extends React.Component {
  state = { element: "" }

  componentDidMount() {
    if (this.props.element === "list") {
      this.setState({ element: <CollegeList /> })
    } else if (this.props.element === "form") {
      this.setState({ element: <CollegeForm /> })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.element === "list") {
        this.setState({ element: <CollegeList /> })
      } else if (this.props.element === "form") {
        this.setState({ element: <CollegeForm /> })
      }
    }
  }

  render() {
    const { element } = this.state
    return (
      <React.Fragment>
        <Row>
          <Col md="2">
            <div className="sidenav" vertical>
              <Link href={`/admin?type=system&element=form`}>
                <a className="item">Add College</a>
              </Link>
              <Link href={`/admin?type=system&element=list`}>
                <a className="item">College List</a>
              </Link>
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
}

export default SystemAdmin

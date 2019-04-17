import React from "react"
import { Row, Col } from "reactstrap"
import SideNav from "../SideNav"

const Layout = props => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="2">
          <SideNav system />
        </Col>
        <Col lg="9">
          <Col>{props.children}</Col>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Layout
